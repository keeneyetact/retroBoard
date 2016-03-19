import io from 'socket.io-client';
import { ADD_POST } from '../state/posts';
import { JOIN_SESSION } from '../state/session';

let socket = null;

export const init = store => {
    socket = io();

    socket.on('RECEIVE_POST', data => {
        store.dispatch({ type: 'RECEIVE_POST', data });
    });
}

export const socketIoMiddleware = store => next => action => {
    const result = next(action);

    switch (action.type) {
        case ADD_POST:
            socket.emit(ADD_POST, action);
            break;
        case JOIN_SESSION:
            socket.emit(JOIN_SESSION, action);
            //socket.join('board-' + action.sessionId);
            break;
    }

    return result;
}
