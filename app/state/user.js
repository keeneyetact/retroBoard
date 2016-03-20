import ls from 'local-storage';

export const LOGIN = 'LOGIN';
export const AUTO_LOGIN = 'AUTO_LOGIN';

export default function reducer(state = {
    name: null
}, action) {
    switch (action.type) {
        case LOGIN:
        case AUTO_LOGIN:
            return {
                ...state,
                name: action.data.name
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

export const autoLogin = () => dispatch => {
    const username = ls('username');
    if (username) {
        dispatch({ type: AUTO_LOGIN, data: { name: username }});
    }
};
