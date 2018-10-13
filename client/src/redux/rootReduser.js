// import { combineReducers } from "redux";
// import { localizeReducer } from "react-localize-redux";
import { RECORD_TOKEN, LOGOUT } from "./actionTypes";

const initialState = {
    userInfo: [],
    token: ""
};

const rootReduser = (state = initialState, action) => {
    switch(action.type){
        case RECORD_TOKEN:
        console.log("reducer", action.payload);
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

// const rootReduser = combineReducers({appReduser: appReduser, localize: localizeReducer})

export default rootReduser;