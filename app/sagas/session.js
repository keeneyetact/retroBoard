import { call, put, select } from 'redux-saga/effects';
import uuid from 'node-uuid';
import { JOIN_SESSION, CREATE_SESSION_SUCCESS, RECEIVE_CLIENT_LIST } from '../state/session';

export function* autoJoinUser(sessionId) {
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
    const sessionId = uuid.v1();
    const user = yield select(state => state.user.name);
    yield put({ type: CREATE_SESSION_SUCCESS, payload: { sessionId } });
    yield put({ type: JOIN_SESSION, payload: { sessionId, user }});
    yield put({ type: RECEIVE_CLIENT_LIST, payload: [ user ]});
    yield put(push('/session/'+sessionId));
}
