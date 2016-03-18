import { push } from 'react-router-redux';

export const CREATE_SESSION = 'CREATE_SESSION';
export const CREATE_SESSION_SUCCESS = 'CREATE_SESSION_SUCCESS';
export const JOIN = 'JOIN_SESSION';

export default function reducer(state = {
    id: null,
    name: null
} , action) {
    switch (action.type) {
        case CREATE_SESSION_SUCCESS:
            return {
                ...state,
                id: action.id,
                name: 'TODO'
            };
        case JOIN:
            return state;
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
                dispatch({ type: CREATE_SESSION_SUCCESS, id: session.id });
                return session.id;
            })
            .then(id => {
                dispatch({ type: 'server/JOIN_SESSION', data: {sessionId: id} });
                return id;
            })
            .then(id => dispatch(push('/session/'+id)));
    }
}
