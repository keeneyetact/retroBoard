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

export const login = user => ({
    type: LOGIN,
    name: user
});
