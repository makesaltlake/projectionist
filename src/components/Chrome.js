import React, { Component } from 'react';

import { firebase } from '../firebase';

export default class Chrome extends Component {
  logout = () => {
    firebase.auth().signOut();
  }

  render() {
    return <div>
      <div className="Chrome-header">
        <h3 className="Chrome-header-text">Projectionist</h3>
        <a className="Chrome-logout-button" onClick={this.logout} href='javascript:void(0)'>Log out</a>
      </div>
      <div className="Chrome-middle">
        <div className="Chrome-content">
          {this.props.children}
        </div>
      </div>
    </div>;
  }
}
