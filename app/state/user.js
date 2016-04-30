import { createAction } from 'redux-actions';

export const AUTO_LOGIN = 'AUTO_LOGIN';
export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';
export const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE';
export const CHANGE_LANGUAGE_SUCCESS = 'CHANGE_LANGUAGE_SUCCESS';

export default function reducer(state = {
    name: null,
    lang: 'en'
}, action) {
    switch (action.type) {
    case LOGIN_SUCCESS:
        return {
            ...state,
            name: action.payload.name
        };
    case CHANGE_LANGUAGE_SUCCESS:
        return {
            ...state,
            lang: action.payload
        };
    case LOGOUT:
        return {
            ...state,
            name: null
        };
    default:
        return state;
    }
}

export const autoLogin = createAction(AUTO_LOGIN);
export const login = createAction(LOGIN, user => ({ name: user }));
export const logout = createAction(LOGOUT);
export const changeLanguage = createAction(CHANGE_LANGUAGE);
