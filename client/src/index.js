import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import translations from './translations/global';
import { IntlReducer as Intl, IntlProvider } from 'react-redux-multilingual';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
// import '../semantic/dist/semantic.min.css';

let reducers = combineReducers(Object.assign({}, { Intl }));
let store = createStore(reducers);


ReactDOM.render(
    <Provider store={store}>
        <IntlProvider translations={translations} locale='en'>
            <App />
        </IntlProvider>
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
