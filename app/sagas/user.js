import ls from 'local-storage';
import { put } from 'redux-saga/effects';
import { LOGIN_SUCCESS, CHANGE_LANGUAGE_SUCCESS } from '../state/user';
import { loadPreviousSessions } from './session';
import { push } from 'react-router-redux';

export function* loginSuccess(name) {
    yield put({ type: LOGIN_SUCCESS, payload: ({ name }) });
}

export function* storeUserToLocalStorage(action) {
    ls('username', action.payload.name);
    yield loginSuccess(action.payload.name);
}

export function* deleteUserFromLocalStorage() {
    ls('username', null);
}

export function* changeLanguageSuccess(lang) {
    yield put({ type: CHANGE_LANGUAGE_SUCCESS, payload: lang });
}

export function* storeLanguageToLocalStorage(action) {
    ls('language', action.payload);
    yield changeLanguageSuccess(action.payload);
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
    yield loadPreviousSessions();
}

export function* loginUser(action) {
    yield storeUserToLocalStorage(action);
    yield loadPreviousSessions();
}
