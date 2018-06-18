import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import TokenChooser from './TokenChooser';

import './App.css';

class App extends Component {
  render() {
    return <div className="App-outer">
      <div className="App-inner">
        <TokenChooser/>
      </div>
    </div>;
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
