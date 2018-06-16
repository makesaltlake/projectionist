import React, { Component } from 'react';

import { firestore } from '../firebase';

import FieldEditor from '../components/FieldEditor';

export default class Display extends Component {
  state = {
    display: null
  }

  componentDidMount() {
    this.unregisterListener = firestore.collection('displays').doc(this.props.id).onSnapshot(display => {
      this.setState({display: display});
    });
  }

  componentWillUnmount() {
    this.unregisterListener();
  }

  setName = async (name) => {
    return firestore.collection('displays').doc(this.props.id).update({name});
  }

  render() {
    if (this.state.display) {
      return <div>
        <FieldEditor wrapWith={'h4'} value={this.state.display.data().name} onSave={this.setName}/>
      </div>;
    } else {
      return <div>Loading...</div>;
    }
  }
}
