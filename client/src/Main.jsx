import history from './history/history';
import { Router, Switch, Route } from 'react-router';
import React, { Component } from 'react';
import SingleMovie from './components/SingleMovie';
import Library from './components/Library';
import Cabinet from './components/Cabinet';
import Header from './components/Header';
import Footer from './components/Footer';

class Main extends Component {

    componentDidMount() {
        if (localStorage.getItem('token') === null) {
            this.props.history.push('/signin');
        }
    }

    render() {
        return (
            <Router history={history}>
                <main>
                    <Header history={history}/>
                    <Switch>
                        <Route exact path='/' component={Library} />
                        <Route exact path='/library' component={Library} />
                        <Route path='/movie/:id' component={SingleMovie} />
                        <Route exact path='/myProfile' component={Cabinet} />
                    </Switch>
                    <Footer/>
                </main>
            </Router>
        );
    }
}

export default Main;
