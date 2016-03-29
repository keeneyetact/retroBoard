import ls from 'local-storage';
import uuid from 'node-uuid';
import { takeEvery, takeLatest } from 'redux-saga'
import { call, put, select } from 'redux-saga/effects'
import { AUTO_LOGIN, LOGIN, LOGIN_SUCCESS, LOGOUT, CHANGE_LANGUAGE, CHANGE_LANGUAGE_SUCCESS } from '../state/user';
import { LEAVE_SESSION, AUTO_JOIN, JOIN_SESSION, CREATE_SESSION, CREATE_SESSION_SUCCESS, RECEIVE_CLIENT_LIST } from '../state/session';
import { ADD_POST, ADD_POST_SUCCESS } from '../state/posts';
import { INITIALISE } from '../state/actions';
import { push } from 'react-router-redux';

function* whenTheAppInitialises() {
    yield* takeEvery(INITIALISE, initialiseApp);
}

function* whenAUserLogsIn() {
    yield* takeEvery(LOGIN, storeUserToLocalStorage);
}

function* whenAUserLogsOut() {
    yield* takeEvery(LOGOUT, deleteUserFromLocalStorage);
}

function* whenAUserChangesItsLanguage() {
    yield* takeEvery(CHANGE_LANGUAGE, storeLanguageToLocalStorage);
}

function* whenAUserLeavesTheSession() {
    yield* takeEvery(LEAVE_SESSION, disconnectUser);
}

function* whenAUserPosts() {
    yield* takeEvery(ADD_POST, addPost);
}

function* whenCreatingASession() {
    yield* takeEvery(CREATE_SESSION, createSession);
}

function* initialiseApp(action) {
    yield autoLoginUser();
    yield autoJoinUser(action.payload);
}

function* storeUserToLocalStorage(action) {
    ls('username', action.payload.name);
    yield loginSuccess(action.payload.name);
}

function* deleteUserFromLocalStorage() {
    ls('username', null);
}

function* storeLanguageToLocalStorage(action) {
    ls('language', action.payload);
    yield changeLanguageSuccess(action.payload);
}

function* loginSuccess(name) {
    yield put({ type: LOGIN_SUCCESS, payload: ({ name}) });
}

function* changeLanguageSuccess(lang) {
    yield put({ type: CHANGE_LANGUAGE_SUCCESS, payload: lang });
}

function* disconnectUser() {
    yield put(push('/'));
}

function* autoLoginUser() {
    const username = ls('username');
    if (username) {
        yield loginSuccess(username);
    }
    const language = ls('language');
    if (language) {
        yield changeLanguageSuccess(language);
    }
}

function* autoJoinUser(sessionId) {
    const currentSession = yield select(state => state.session.id);
    const currentUser = yield select(state => state.user.name);

    if (sessionId && sessionId !== currentSession) {
        yield put({ type: JOIN_SESSION, payload: {
            sessionId,
            user: currentUser
        }});
    }
}

function* addPost(action) {
    const sessionId = yield select(state => state.session.id);
    const user = yield select(state => state.user.name);
    const postId = uuid.v1();

    yield put({ type: ADD_POST_SUCCESS, payload: {
        id: postId,
        sessionId,
        postType: action.payload.postType,
        content: action.payload.content,
        user,
        votes: 0
    }});
}

function* createSession(action) {
    const sessionId = uuid.v1();
    const user = yield select(state => state.user.name);
    yield put({ type: CREATE_SESSION_SUCCESS, payload: { sessionId } });
    yield put({ type: JOIN_SESSION, payload: { sessionId, user }});
    yield put({ type: RECEIVE_CLIENT_LIST, payload: [ user ]});
    yield put(push('/session/'+sessionId));
}

export default [
    whenTheAppInitialises,
    whenAUserLogsIn,
    whenAUserLogsOut,
    whenAUserChangesItsLanguage,
    whenAUserLeavesTheSession,
    whenAUserPosts,
    whenCreatingASession
];
