import { call, put, select } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import shortid from 'shortid';
import { JOIN_SESSION, CREATE_SESSION_SUCCESS, RECEIVE_CLIENT_LIST, RENAME_SESSION, RENAME_SESSION_SUCCESS, LOAD_PREVIOUS_SESSIONS } from '../state/session';
import ls from 'local-storage';
import find from 'lodash/find';

export function* autoJoinUser(action) {
    const sessionId = action.payload;
    const currentSession = yield select(state => state.session.id);
    const currentUser = yield select(state => state.user.name);

    if (sessionId && sessionId !== currentSession) {
        yield put({ type: JOIN_SESSION, payload: {
            sessionId,
            user: currentUser
        }});
        storeSessionToLocalStorage(currentUser, sessionId);
    }
}

export function* renameCurrentSessionInLocalStorage (action) {
    console.log("renaming session");
    console.log(action);
    const currentSession = yield select(state => state.session.id);
    const currentUser = yield select(state => state.user.name);
    let savedSessions = ls.get('sessions');
    let savedSession  = find(savedSessions[currentUser], session => session.id === currentSession);
    savedSession.name = action.payload;
    ls.set('sessions', savedSessions);
}

function storeSessionToLocalStorage(currentUser, sessionId) {
    let savedSessions = ls.get('sessions');
    if (savedSessions === null) {
        savedSessions = {};
    }

    if(!savedSessions.hasOwnProperty(currentUser)){
        savedSessions[currentUser] = [];
    }

    let savedSession  = find(savedSessions[currentUser], session => session.id === sessionId);
    if(!savedSession){
        savedSession = {
            id: sessionId
        };
        savedSessions[currentUser].push(savedSession);
    }
    savedSession.lastJoin = Date.now();
    ls.set('sessions', savedSessions);
}

export function* loadPreviousSessions() {
    const currentUser = yield select(state => state.user.name);
    const sessions = ls.get('sessions');
    if (!!sessions && sessions.hasOwnProperty(currentUser)) {
        yield put({ type: LOAD_PREVIOUS_SESSIONS, payload: sessions[currentUser] });
    }
}

export function* createSession(action) {
    const sessionId = shortid.generate();
    const sessionName = action.payload || null;
    const user = yield select(state => state.user.name);
    yield put({ type: CREATE_SESSION_SUCCESS, payload: { sessionId } });
    storeSessionToLocalStorage(user, sessionId);
    yield put({ type: RENAME_SESSION, payload: sessionName });
    yield put({ type: JOIN_SESSION, payload: { sessionId, user }});
    yield put({ type: RECEIVE_CLIENT_LIST, payload: [ user ]});
    yield put(push('/session/'+sessionId));
}
