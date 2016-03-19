import { push } from 'react-router-redux';

export const CREATE_SESSION = 'CREATE_SESSION';
export const CREATE_SESSION_SUCCESS = 'CREATE_SESSION_SUCCESS';
export const JOIN_SESSION = 'JOIN_SESSION';

export default function reducer(state = {
    id: null,
    name: null
} , action) {
    switch (action.type) {
        case CREATE_SESSION_SUCCESS:
            return {
                ...state,
                id: action.sessionId,
                name: 'TODO'
            };
        case JOIN_SESSION:
            return {
                ...state,
                id: action.sessionId,
                name: 'TODO'
            };
        default:
            return state;
    }
}

export const createSession = () => {
    return dispatch => {
        dispatch({ type: CREATE_SESSION });
        fetch('/api/create')
            .then(response => response.json())
            .then(session => {
                dispatch({ type: CREATE_SESSION_SUCCESS, sessionId: session.id });
                return session.id;
            })
            .then(id => {
                dispatch({ type: JOIN_SESSION, sessionId: id });
                return id;
            })
            .then(id => dispatch(push('/session/'+id)));
    }
}

export const autoJoin = sessionId => (dispatch, getState) => {
    console.log('Session id auto join: ', sessionId);
    const state = getState();
    if (state.session.id !== sessionId && sessionId) {
        dispatch({ type: JOIN_SESSION, sessionId });
    }
};
