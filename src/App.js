import React, { Component } from 'react';
import { Router, Link } from '@reach/router';

import { auth } from './firebase';

import Chrome from './components/Chrome';
import Display from './Display';
import DisplayList from './DisplayList';
import LoginGuard from './components/LoginGuard';

import 'normalize.css/normalize.css';
import 'milligram/dist/milligram.min.css';
import './milligram-alterations.css';
import './App.css';

const Hi = () => <div style={{margin: '0.5rem'}}>Hello! You probably want to <Link to="/displays">view displays</Link>.</div>

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
