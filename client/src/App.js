import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Dashboard from './containers/dashboard';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          {/* <Route exact path="/" component={Dashboard}></Route> */}
            <Dashboard />
        </Router>
      </div>
    );
  }
}

export default App;
