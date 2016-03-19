import ls from 'local-storage';

export const LOGIN = 'LOGIN';

export default function reducer(state = {
    name: null
}, action) {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                name: action.name
            };
        default:
            return state;
    }
}

export const login = user => dispatch => {
    ls('username', user);
    dispatch({
        type: LOGIN,
        name: user
    });
};

export const autoLogin = () => dispatch => {
    const username = ls('username');
    if (username) {
        dispatch(login(username));
    }
};
