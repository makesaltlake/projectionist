import React, { Component } from 'react';
import { Auth, auth } from '../firebase';

export default class LoginGuard extends Component {
  state = {
    currentUser: null
  }

  componentDidMount() {
    this.unregisterAuthHandler = auth.onAuthStateChanged(user => {
      this.setState({
        currentUser: user
      });
    });
  }

  render() {
    if (this.state.currentUser) {
      return <React.Fragment>
        {this.props.children}
      </React.Fragment>;
    } else {
      return <Auth/>
    }
  }

  componentWillUnmount() {
    this.unregisterAuthHandler();
  }
}
