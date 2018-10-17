import {createStore} from 'redux';
import resultReduser from './rootReduser';

export const componentStore = () => {
    const store = createStore(
        resultReduser, 
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

    return store;
}