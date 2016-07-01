import ls from 'local-storage';
import { put, call } from 'redux-saga/effects';
import { changeLanguageSuccess, loginSuccess } from '../state/user';
import { loadPreviousSessions } from './session';
import { push } from 'react-router-redux';

export function* deleteUserFromLocalStorage() {
    ls('username', null);
}

export function* storeLanguageToLocalStorage(action) {
    ls('language', action.payload);
    yield put(changeLanguageSuccess(action.payload));
}

export function* disconnectUser() {
    yield put(push('/'));
}

export function* autoLoginUser() {
    const username = yield call(ls, 'username');
    if (username) {
        yield put(loginSuccess(username));
    }
    const language = yield call(ls, 'language');
    if (language) {
        yield put(changeLanguageSuccess(language));
    }
    yield call(loadPreviousSessions);
}

export function* loginUser(action) {
    yield call(ls, 'username', action.payload.name);
    yield put(loginSuccess(action.payload.name));
    yield call(loadPreviousSessions);
}
