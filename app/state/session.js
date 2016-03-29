import { createAction } from 'redux-actions';

export const CREATE_SESSION = 'CREATE_SESSION';
export const CREATE_SESSION_SUCCESS = 'CREATE_SESSION_SUCCESS';
export const AUTO_JOIN = 'AUTO_JOIN';
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

export const createSession = createAction(CREATE_SESSION);
export const leave = createAction(LEAVE_SESSION);
