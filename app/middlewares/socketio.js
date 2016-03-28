import io from 'socket.io-client';
import { ADD_POST, RECEIVE_BOARD, RECEIVE_POST, RECEIVE_DELETE_POST, DELETE_POST, LIKE, RECEIVE_LIKE } from '../state/posts';
import { JOIN_SESSION, LEAVE_SESSION, RECEIVE_CLIENT_LIST } from '../state/session';
import { LOGIN_SUCCESS } from '../state/user';

let socket = null;

export const init = store => {
    socket = io();

    // Each of these actions will be listened to from SocketIO, and will trigger a new client-side action when received
    const actions = [RECEIVE_POST, RECEIVE_BOARD, RECEIVE_DELETE_POST, RECEIVE_LIKE, RECEIVE_CLIENT_LIST];

    actions.forEach(action => {
        socket.on(action, payload => {
            store.dispatch({ type: action, payload });
        });
    });
};

export const socketIoMiddleware = store => next => action => {
    const result = next(action);

    // Each of these actions will trigger an emit via SocketIO
    const actions = [ADD_POST, JOIN_SESSION, DELETE_POST, LIKE, LOGIN_SUCCESS, LEAVE_SESSION];

    if (actions.indexOf(action.type) > -1) {
        const state = store.getState();
        const sessionId = state.session.id;
        socket.emit(action.type, {
            sessionId,
            payload: action.payload
        });
    }

    return result;
};
