import {createStore} from 'redux';
import rootReduser from './rootReduser';

export const componentStore = () => {
    const store = createStore(
        rootReduser, 
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

    return store;
}