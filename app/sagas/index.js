import ls from 'local-storage';
import { takeEvery, takeLatest } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import { AUTO_LOGIN, LOGIN, LOGIN_SUCCESS, LOGOUT, JOIN_SESSION, CHANGE_LANGUAGE, CHANGE_LANGUAGE_SUCCESS } from '../state/user';

function* whenAUserLogsIn(action) {
    yield* takeEvery(LOGIN, storeUserToLocalStorage);
}

function* whenAUserLogsOut(action) {
    yield* takeEvery(LOGOUT, deleteUserFromLocalStorage);
}

function* whenAUserChangesItsLanguage(action) {
    yield* takeEvery(CHANGE_LANGUAGE, storeLanguageToLocalStorage);
}

function* whenAUserAutoLogsIn(action) {
    yield* takeEvery(AUTO_LOGIN, autoLoginUser);
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

function* autoLoginUser(action) {
    const username = ls('username');
    if (username) {
        yield loginSuccess(username);
    }
    const language = ls('language');
    if (language) {
        yield changeLanguageSuccess(language);
    }
}

export default [
    whenAUserLogsIn,
    whenAUserLogsOut,
    whenAUserChangesItsLanguage,
    whenAUserAutoLogsIn
];
