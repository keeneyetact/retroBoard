import ls from 'local-storage';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const AUTO_LOGIN = 'AUTO_LOGIN';
export const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE';

export default function reducer(state = {
    name: null,
    lang: 'en'
}, action) {
    switch (action.type) {
        case LOGIN:
        case AUTO_LOGIN:
            return {
                ...state,
                name: action.payload.name
            };
        case CHANGE_LANGUAGE:
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

export const login = user => (dispatch, getState) => {
    ls('username', user);
    const state = getState();
    dispatch({
        type: LOGIN,
        payload: {
            name: user,
            sessionId: state.session.id
        }
    });
};

export const logout = () => dispatch => {
    ls('username', null);
    dispatch({
        type: LOGOUT
    });
}

export const autoLogin = () => dispatch => {
    const username = ls('username');
    if (username) {
        dispatch({ type: AUTO_LOGIN, payload: { name: username }});
    }
    const language = ls('language');
    if (language) {
        dispatch({ type: CHANGE_LANGUAGE, payload: language });
    }
};

export const changeLanguage = lang => dispatch => {
    ls('language', lang);
    dispatch({ type: CHANGE_LANGUAGE, payload: lang });
};
