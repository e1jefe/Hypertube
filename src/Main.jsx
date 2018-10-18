import history from './history/history';
import { Router, Switch, Route } from 'react-router';
import React, { Component } from 'react';
import SingleMovie from './components/SingleMovie';
import Library from './components/Library';
import Header from './components/Header';
import Footer from './components/Footer';

class Main extends Component {

    render() {
        return (
            <Router history={history}>
                <main>
                    <Header />
                    <Switch>
                        <Route exact path='/' component={Library} />
                        <Route exact path='/library' component={Library} />
                        <Route path='/movie/:id' component={SingleMovie} />
                    </Switch>
                    <Footer/>
                </main>
            </Router>
        );
    }
}

export default Main;
