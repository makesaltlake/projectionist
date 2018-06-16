import React, { Component } from 'react';
import { Router } from '@reach/router';

import { firebase } from './firebase';

import LoginGuard from './components/LoginGuard';

import './App.css';

const Hi = ({logout}) => <div>Hello! Looks like you're logged in. <button onClick={logout}>Log out</button></div>

class App extends Component {
  logout = () => {
    firebase.auth().signOut();
  }

  render() {
    return (
      <Router>
        <LoginGuard path="/">
          <Hi path="/" logout={this.logout}/>
        </LoginGuard>
      </Router>
    );
  }
}

export default App;
