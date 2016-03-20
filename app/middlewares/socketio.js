import io from 'socket.io-client';
import { ADD_POST, RECEIVE_BOARD, RECEIVE_POST, RECEIVE_DELETE_POST, DELETE_POST, LIKE, RECEIVE_LIKE } from '../state/posts';
import { JOIN_SESSION, RECEIVE_CLIENT_LIST } from '../state/session';
import { LOGIN } from '../state/user';

let socket = null;

export const init = store => {
    socket = io();

    // Each of these actions will be listened to from SocketIO, and will trigger a new client-side action when received
    const actions = [RECEIVE_POST, RECEIVE_BOARD, RECEIVE_DELETE_POST, RECEIVE_LIKE, RECEIVE_CLIENT_LIST];

    actions.forEach(action => {
        socket.on(action, data => {
            store.dispatch({ type: action, data });
        });
    });
};

export const socketIoMiddleware = store => next => action => {
    const result = next(action);

    // Each of these actions will trigger an emit via SocketIO
    const actions = [ADD_POST, JOIN_SESSION, DELETE_POST, LIKE, LOGIN];

    if (actions.indexOf(action.type) > -1) {
        socket.emit(action.type, action.data);
    }

    return result;
};
