import io from 'socket.io-client';
import { ADD_POST, RECEIVE_BOARD, RECEIVE_POST, RECEIVE_DELETE_POST, DELETE_POST } from '../state/posts';
import { JOIN_SESSION } from '../state/session';

let socket = null;

export const init = store => {
    socket = io();

    const actions = [RECEIVE_POST, RECEIVE_BOARD, RECEIVE_DELETE_POST];

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
            socket.emit(JOIN_SESSION, action);
            break;
        case DELETE_POST:
            socket.emit(DELETE_POST, action.data);
            break;
    }

    return result;
}
