import React, { Component } from 'react';
import './App.css';
import { Router, Switch, Route, Redirect } from 'react-router';
import Signin from './components/Signin';
import Signup from './components/Signup';
import history from './history/history';
import Main from './Main';
import { connect } from 'react-redux';
import Reset from './components/Reset';
import ResetConfirm from './components/ResetConfirm';
import SignupConfirm from './components/SignupConfirm';
import { IntlProvider } from 'react-intl';
import SocialRedirect from "./components/SocialRedirect";

class App extends Component {
  render() {
    return (
      <IntlProvider locale={this.props.componentState.intl.locale} messages={this.props.componentState.intl.messages}>
        <Router history={history}>
          <Switch>
            <Route exact path="/signin" component={Signin}/>
            <Route path="/signup" component={Signup}/>
            <Route path="/social/:token" component={SocialRedirect}/>
            <Route path="/signupConfirm/:token" component={SignupConfirm}/>
            <Route path="/resetpass" component={Reset}/>
            <Route path="/resetConfirm/:token" component={ResetConfirm}/>           
            <ProtectedRoute path="/" component={Main}/>
          </Switch>
        </Router>
      </IntlProvider>
    );
  }
}

class ProtectedRoute extends React.Component {
  render() {
    const { component : Component, ...rest } = this.props;
    return (
    <Route {...rest} render={(props) => (
      localStorage.getItem('token')
      ? <Component {...props} />
      : <Redirect to='/signin' />
    )} />
    );
  }
}

const mapStateToProps = state => {
  return {
      componentState: state
  };
};

export default connect(mapStateToProps, null)(App);
