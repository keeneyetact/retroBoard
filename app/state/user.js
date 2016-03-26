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
                name: action.data.name
            };
        case CHANGE_LANGUAGE:
            return {
                ...state,
                lang: action.data
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
        data: {
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
        dispatch({ type: AUTO_LOGIN, data: { name: username }});
    }
    const language = ls('language');
    if (language) {
        dispatch({ type: CHANGE_LANGUAGE, data: language });
    }
};

export const changeLanguage = lang => dispatch => {
    ls('language', lang);
    dispatch({ type: CHANGE_LANGUAGE, data: lang });
};
