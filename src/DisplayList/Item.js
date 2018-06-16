import React, { Component } from 'react';
import { Link } from '@reach/router';

import { firestore } from '../firebase';

export default class Item extends Component {
  deleteDisplay = () => {
    firestore.collection('displays').doc(this.props.display.id).delete();
  }

  render() {
    return <div>
      {this.props.display.data().name}&nbsp;
      <Link to={this.props.display.id}>Edit</Link>&nbsp;
      <a href='javascript:void(0)' onClick={this.deleteDisplay}>Delete</a>
    </div>
  }
}
