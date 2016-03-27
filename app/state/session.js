import { push } from 'react-router-redux';

export const CREATE_SESSION = 'CREATE_SESSION';
export const CREATE_SESSION_SUCCESS = 'CREATE_SESSION_SUCCESS';
export const JOIN_SESSION = 'JOIN_SESSION';
export const LEAVE_SESSION = 'LEAVE_SESSION';
export const RECEIVE_CLIENT_LIST = 'RECEIVE_CLIENT_LIST';

export default function reducer(state = {
    id: null,
    clients: []
} , action) {
    switch (action.type) {
        case CREATE_SESSION_SUCCESS:
        case JOIN_SESSION:
            return {
                ...state,
                id: action.payload.sessionId,
            };
        case RECEIVE_CLIENT_LIST:
            return {
                ...state,
                clients: action.payload
            }
        case LEAVE_SESSION:
            return {
                ... state,
                id: null,
                clients: []
            };
        default:
            return state;
    }
}

export const createSession = () => {
    return (dispatch, getState) => {
        const state = getState();
        dispatch({ type: CREATE_SESSION });
        fetch('/api/create')
            .then(response => response.json())
            .then(session => {
                dispatch({ type: CREATE_SESSION_SUCCESS, payload: { sessionId: session.id }});
                return session.id;
            })
            .then(id => {
                dispatch({ type: JOIN_SESSION, payload: { sessionId: id, user: state.user.name }});
                return id;
            })
            .then(id => {
                dispatch({ type: RECEIVE_CLIENT_LIST, payload: [ state.user.name ] });
                return id;
            })
            .then(id => dispatch(push('/session/'+id)))
            .catch(err => {
                console.error(err);
            });
    }
}

export const autoJoin = sessionId => (dispatch, getState) => {
    const state = getState();
    if (state.session.id !== sessionId && sessionId) {
        dispatch({ type: JOIN_SESSION, payload: {
            sessionId,
            user: state.user.name
        } });
    }
};

export const leave = () => (dispatch, getState) => {
    const state = getState();
    if (state.session.id) {
        dispatch({ type: LEAVE_SESSION, payload: state.session.id });
        dispatch(push('/'));
    }
};
