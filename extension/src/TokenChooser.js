import React, { Component } from 'react';

import asPromise from './asPromise';
import { functions } from './firebase';

export default class TokenChooser extends Component {
  state = {
    storedClientToken: null,
    tokenFieldValue: '',
    settingToken: false,
    error: null
  }

  async componentDidMount() {
    console.log('chrome is', chrome);
    console.log('storage is', chrome.storage);
    chrome.storage.onChanged.addListener(this.storageChanged);
    this.setState({
      storedClientToken: (await asPromise(callback => chrome.storage.local.get('storedClientToken', callback))).storedClientToken || null
    });
  }

  componentWillUnmount() {
    chrome.storage.onChanged.removeListener(this.storageChanged);
  }

  disconnect = async () => {
    await asPromise(callback => chrome.storage.local.remove('storedClientToken', callback));
  }

  tokenFieldChanged = (event) => {
    this.setState({
      tokenFieldValue: event.target.value
    });
  }

  saveToken = async (event) => {
    event.preventDefault();
    this.setState({settingToken: true});
    try {
      let {data: {authToken, display}} = await functions.httpsCallable('getClientAuthToken')({displayToken: this.state.tokenFieldValue});
      await asPromise(callback => chrome.storage.local.set({storedClientToken: this.state.tokenFieldValue}, callback));
    } catch (e) {
      console.warn("couldn't set token:", e);
      this.setState({
        settingToken: false,
        error: "Looks like that didn't work. Make sure you've got the right token, then try again."
      });
      return;
    }
    this.setState({
      settingToken: false,
      error: null
    })
  }

  storageChanged = (changes, namespace) => {
    if (namespace == 'local') {
      if (changes.storedClientToken && changes.storedClientToken.oldValue !== changes.storedClientToken.newValue) {
        this.setState({
          storedClientToken: changes.storedClientToken.newValue
        });
      }
    }
  }

  render() {
    if (this.state.storedClientToken) {
      console.log('token value:', this.state.storedClientToken);
      return <div>
        <div>This display has been connected!</div>
        <div><button onClick={this.disconnect}>Disconnect</button></div>
      </div>
    } else {
      return <div>
        <div>Not connected yet. Enter token here:</div>
        <div><input type="text" value={this.state.tokenFieldValue} onChange={this.tokenFieldChanged} disabled={this.state.settingToken}/></div>
        <div><button onClick={this.saveToken} disabled={this.state.settingToken}>Save</button></div>
        <div className="TokenChooser-error">{this.state.error}</div>
      </div>;
    }
  }
}
