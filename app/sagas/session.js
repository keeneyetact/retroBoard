import { call, put, select } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import shortid from 'shortid';
import { JOIN_SESSION, CREATE_SESSION_SUCCESS, RECEIVE_CLIENT_LIST, RENAME_SESSION, RENAME_SESSION_SUCCESS } from '../state/session';

export function* autoJoinUser(action) {
    const sessionId = action.payload;
    const currentSession = yield select(state => state.session.id);
    const currentUser = yield select(state => state.user.name);

    if (sessionId && sessionId !== currentSession) {
        yield put({ type: JOIN_SESSION, payload: {
            sessionId,
            user: currentUser
        }});
    }
}

export function* createSession(action) {
    const sessionId = shortid.generate();
    const sessionName = action.payload || null;
    const user = yield select(state => state.user.name);
    yield put({ type: CREATE_SESSION_SUCCESS, payload: { sessionId } });
    yield put({ type: RENAME_SESSION, payload: sessionName });
    yield put({ type: JOIN_SESSION, payload: { sessionId, user }});
    yield put({ type: RECEIVE_CLIENT_LIST, payload: [ user ]});
    yield put(push('/session/'+sessionId));
}
