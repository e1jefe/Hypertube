import React, { Component } from 'react';
import './App.css';
import { Router, Switch, Route } from 'react-router';
import Signin from './components/Signin';
import Signup from './components/Signup';
import history from './history/history';
import Main from './Main';
// import Reset from './components/reset';


class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/signin" component={Signin}/>
          <Route path="/signup" component={Signup}/>
          <Route path="/" component={Main}/>
          {/* <Route path="/resetpass" component={Reset}/> */}
        </Switch>
      </Router>
    );
  }
}

export default App;
