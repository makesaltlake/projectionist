import React, { Component } from 'react';

import { firestore } from '../firebase';

import Item from './Item';

export default class DisplayList extends Component {
  state = {
    displays: []
  }

  componentDidMount() {
    this.unregisterListener = firestore.collection('displays').onSnapshot(results => {
      this.setState({displays: results.docs});
    });
  }

  componentWillUnmount() {
    this.unregisterListener();
  }

  createDisplay = () => {
    firestore.collection('displays').add({
      name: 'Unnamed Display',
      panels: []
    });
  }

  render() {
    return <div>
      <h4>Displays</h4>
      {this.state.displays.map(display => <Item display={display} key={display.id}/>)}
      <button onClick={this.createDisplay}>Create Display</button>
    </div>;
  }
}
