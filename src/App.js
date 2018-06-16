import React, { Component } from 'react';
import { Router } from '@reach/router';

import { auth } from './firebase';

import Chrome from './components/Chrome';
import Display from './Display';
import DisplayList from './DisplayList';
import LoginGuard from './components/LoginGuard';

import 'normalize.css/normalize.css';
import 'milligram/dist/milligram.min.css';
import './milligram-alterations.css';
import './App.css';

const Hi = ({logout}) => <div style={{margin: '0.5rem'}}>Hello! Looks like you're logged in. <button onClick={logout} className="button">Save</button> <button onClick={logout} className="button-outline">Cancel</button></div>

class App extends Component {
  logout = () => {
    auth.signOut();
  }

  render() {
    return (
      <Router>
        <LoginGuard path="/">
          <Chrome path="/">
            <DisplayList path="/displays"/>
            <Display path="/displays/:id"/>
            <Hi path="/" logout={this.logout}/>
          </Chrome>
        </LoginGuard>
      </Router>
    );
  }
}

export default App;
