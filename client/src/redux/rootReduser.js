import { combineReducers } from "redux";
import { intlReducer } from 'react-intl-redux';
import { RECORD_TOKEN, LOGOUT } from "./actionTypes";

const initialState = {
    userInfo: [],
    token: ""
};

const rootReduser = (state = initialState, action) => {
    switch(action.type){
        case RECORD_TOKEN:
            return {
                ...state,
                token: action.payload
            }

        case LOGOUT:
            return {
                ...state,
                userInfo: [],
                token: ""
            }

        default:
            return state
    }
}

const resultReduser = combineReducers({...rootReduser, intl: intlReducer})

export default resultReduser;