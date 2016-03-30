import ls from 'local-storage';
import { call, put, select } from 'redux-saga/effects';
import { AUTO_LOGIN, LOGIN, LOGIN_SUCCESS, LOGOUT, CHANGE_LANGUAGE, CHANGE_LANGUAGE_SUCCESS } from '../state/user';
import { push } from 'react-router-redux';

export function* storeUserToLocalStorage(action) {
    ls('username', action.payload.name);
    yield loginSuccess(action.payload.name);
}

export function* deleteUserFromLocalStorage() {
    ls('username', null);
}

export function* storeLanguageToLocalStorage(action) {
    ls('language', action.payload);
    yield changeLanguageSuccess(action.payload);
}

export function* loginSuccess(name) {
    yield put({ type: LOGIN_SUCCESS, payload: ({ name}) });
}

export function* changeLanguageSuccess(lang) {
    yield put({ type: CHANGE_LANGUAGE_SUCCESS, payload: lang });
}

export function* disconnectUser() {
    yield put(push('/'));
}

export function* autoLoginUser() {
    const username = ls('username');
    if (username) {
        yield loginSuccess(username);
    }
    const language = ls('language');
    if (language) {
        yield changeLanguageSuccess(language);
    }
}
