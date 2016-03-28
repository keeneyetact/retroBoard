import ls from 'local-storage';
import { takeEvery, takeLatest } from 'redux-saga'
import { call, put, select } from 'redux-saga/effects'
import { AUTO_LOGIN, LOGIN, LOGIN_SUCCESS, LOGOUT, CHANGE_LANGUAGE, CHANGE_LANGUAGE_SUCCESS } from '../state/user';
import { LEAVE_SESSION, AUTO_JOIN, JOIN_SESSION } from '../state/session';
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

function* whenAUserAutoLogsIn() {
    yield* takeEvery(AUTO_LOGIN, autoLoginUser);
}

function* whenAUserLeavesTheSession() {
    yield* takeEvery(LEAVE_SESSION, disconnectUser);
}

function* whenAUserAutoJoinsASession() {
    yield* takeEvery(AUTO_JOIN, autoJoinUser);
}

function* initialiseApp(action) {
    yield autoLoginUser();
    yield autoJoinUser(action.payload);
}

function* storeUserToLocalStorage(action) {
    ls('username', action.payload.name);
    yield loginSuccess(action.payload);
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

    if (sessionId !== currentSession) {
        yield put({ type: JOIN_SESSION, payload: {
            sessionId,
            user: currentUser
        }});
    }
}


export default [
    whenTheAppInitialises,
    whenAUserLogsIn,
    whenAUserLogsOut,
    whenAUserChangesItsLanguage,
    whenAUserAutoLogsIn,
    whenAUserLeavesTheSession,
    whenAUserAutoJoinsASession
];
