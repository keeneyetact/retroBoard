import { createAction } from 'redux-actions';

export const CREATE_SESSION = 'CREATE_SESSION';
export const CREATE_SESSION_SUCCESS = 'CREATE_SESSION_SUCCESS';
export const RENAME_SESSION = 'RENAME_SESSION';
export const RECEIVE_SESSION_NAME = 'RECEIVE_SESSION_NAME';
export const AUTO_JOIN = 'AUTO_JOIN';
export const JOIN_SESSION = 'JOIN_SESSION';
export const LEAVE_SESSION = 'LEAVE_SESSION';
export const RECEIVE_CLIENT_LIST = 'RECEIVE_CLIENT_LIST';
export const LOAD_PREVIOUS_SESSIONS = 'LOAD_PREVIOUS_SESSIONS';

export default function reducer(state = {
    id: null,
    name: null,
    clients: [],
    previousSessions: []
}, action) {
    switch (action.type) {
    case CREATE_SESSION_SUCCESS:
    case JOIN_SESSION:
        return {
            ...state,
            id: action.payload.sessionId
        };
    case RECEIVE_CLIENT_LIST:
        return {
            ...state,
            clients: action.payload
        };
    case LEAVE_SESSION:
        return {
            ...state,
            id: null,
            name: null,
            clients: []
        };
    case RENAME_SESSION:
    case RECEIVE_SESSION_NAME:
        return {
            ...state,
            name: action.payload
        };
    case LOAD_PREVIOUS_SESSIONS:
        return {
            ...state,
            previousSessions: action.payload
        };
    default:
        return state;
    }
}

export const renameSession = createAction(RENAME_SESSION);
export const createSession = createAction(CREATE_SESSION);
export const leave = createAction(LEAVE_SESSION);
export const autoJoin = createAction(AUTO_JOIN);
