import { combineReducers } from "redux";
// import { localizeReducer } from "react-localize-redux";
import { intlReducer } from 'react-intl-redux';
import { RECORD_TOKEN, LOGOUT } from "./actionTypes";

const initialState = {
    // intl: {
    //     locale: 'ru',
    //     messages: {
    //             'signin.account': 'Еще нет аккаунта?',
    //             'signin.signup': 'Регистрация',
    //             'signin.greeting': 'Привет. ',
    //             'signin.try': ' Попробуй Hypertube.',
    //             'signin.legal': 'Единственный не наказуемый способ смотреть фильмы в Юните',
    //             'signin.title': 'Войти по email',
    //             'signin.reset': 'Забыл?',
    //             'signin.btn': 'Войти',
    //             'signin.or': 'ИЛИ',
    //             'signin.social': 'Войти через социальную сеть',
    //             'signup.account': 'Есть аккаунт?',
    //             'signup.signin': 'Вход',
    //             'signup.greeting': 'Привет. ',
    //             'signup.try': ' Попробуй Hypertube.',
    //             'signup.legal': 'Единственный не наказуемый способ смотреть фильмы в Юните',
    //             'signup.title': 'Зарегестрироваться',
    //             'signup.btn': 'Регистрация',
    //             'signup.or': 'ИЛИ',
    //             'signup.social': 'Войти через социальную сеть',
    //             'reset.account': 'Есть аккаунт?',
    //             'reset.signin': 'Вход',
    //             'reset.title': 'Восстановить пароль',
    //             'reset.btn': 'Восстановить'
    //     }
    // },
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

const resultReduser = combineReducers({...rootReduser, intl: intlReducer})

export default resultReduser;