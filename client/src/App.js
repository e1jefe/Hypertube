import React, { Component } from 'react';
import './App.css';
import { Router, Switch, Route } from 'react-router';
import Signin from './components/Signin';
import Signup from './components/Signup';
import history from './history/history';
import Main from './Main';
import { connect } from 'react-redux';
import Reset from './components/Reset';
import ResetConfirm from './components/ResetConfirm';
import { IntlProvider } from 'react-intl';

class App extends Component {
  render() {
    return (
      <IntlProvider locale={this.props.componentState.intl.locale} messages={this.props.componentState.intl.messages}>
        <Router history={history}>
          <Switch>
            <Route exact path="/signin" component={Signin}/>
            <Route path="/signup" component={Signup}/>
            <Route path="/resetpass" component={Reset}/>
            <Route path="/resetConfirm/:token" component={ResetConfirm}/>
            <Route path="/" component={Main}/>
          </Switch>
        </Router>
      </IntlProvider>
    );
  }
}

const mapStateToProps = state => {
  return {
      componentState: state
  };
};

export default connect(mapStateToProps, null)(App);
