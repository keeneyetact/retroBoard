import io from 'socket.io-client';
import { ADD_POST, RECEIVE_BOARD, RECEIVE_POST, RECEIVE_DELETE_POST, DELETE_POST, LIKE, RECEIVE_LIKE } from '../state/posts';
import { JOIN_SESSION, RECEIVE_CLIENT_LIST } from '../state/session';

let socket = null;

export const init = store => {
    socket = io();

    const actions = [RECEIVE_POST, RECEIVE_BOARD, RECEIVE_DELETE_POST, RECEIVE_LIKE, RECEIVE_CLIENT_LIST];

    actions.forEach(action => {
        socket.on(action, data => {
            store.dispatch({ type: action, data });
        });
    });
}

export const socketIoMiddleware = store => next => action => {
    const result = next(action);

    switch (action.type) {
        case ADD_POST:
            socket.emit(ADD_POST, action.data);
            break;
        case JOIN_SESSION:
            socket.emit(JOIN_SESSION, action.data);
            break;
        case DELETE_POST:
            socket.emit(DELETE_POST, action.data);
            break;
        case LIKE:
            socket.emit(LIKE, action.data);
            break;
    }

    return result;
}
