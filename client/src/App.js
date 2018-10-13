import React, { Component } from 'react';
import './App.css';
import { Router, Switch, Route } from 'react-router';
import Signin from './components/Signin';
import Signup from './components/Signup';
import history from './history/history';
import Main from './Main';
import { connect } from 'react-redux';
import Reset from './components/Reset';

class App extends Component {
  render() {
    console.log("token?", this.props.componentState.token);
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/signin" component={Signin}/>
          <Route path="/signup" component={Signup}/>
          <Route path="/resetpass" component={Reset}/>
          {/* <Route path="/" component={this.props.componentState.token.length !== 0 ? Main : Signin}/> */}
          <Route path="/" component={Main}/>
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
      componentState: state
  };
};

export default connect(mapStateToProps, null)(App);
