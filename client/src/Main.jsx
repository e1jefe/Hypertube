import history from './history/history';
import { Router, Switch, Route } from 'react-router';
import React, { Component } from 'react';
import SingleMovie from './components/SingleMovie';
import Library from './components/Library';
import Cabinet from './components/Cabinet';
import Header from './components/Header';
import Footer from './components/Footer';

// import { renderToStaticMarkup } from "react-dom/server";
// import { withLocalize } from "react-localize-redux";
// import globalTranslations from "./translations/global.json";


class Main extends Component {

    // constructor(props) {
    //     super(props);
    
        // this.props.initialize({
        //   languages: [
        //     { name: "English", code: "en" },
        //     { name: "Russion", code: "ru" }
        //   ],
        //   translation: globalTranslations,
        //   options: { renderToStaticMarkup }
        // });
    // }
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

// export default withLocalize(Main);
export default Main;
