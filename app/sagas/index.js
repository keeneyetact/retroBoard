/* eslint func-names: "off" */

import { takeEvery } from 'redux-saga';
import { AUTO_LOGIN, LOGIN, LOGOUT, CHANGE_LANGUAGE } from '../state/user';
import {
    AUTO_JOIN,
    LEAVE_SESSION,
    CREATE_SESSION,
    RECEIVE_SESSION_NAME,
    RENAME_SESSION } from '../state/session';
import { ADD_POST, LIKE } from '../state/posts';

import {
    onLogout,
    onChangeLanguage,
    onLeaveSession,
    onAutoLogin,
    onLogin } from './user';
import { addPost, like } from './posts';
import { autoJoinUser, createSession, renameCurrentSessionInLocalStorage } from './session';

export default function* rootSaga() {
    yield [
        takeEvery(AUTO_LOGIN, onAutoLogin),
        takeEvery(AUTO_JOIN, autoJoinUser),
        takeEvery(RECEIVE_SESSION_NAME, renameCurrentSessionInLocalStorage),
        takeEvery(RENAME_SESSION, renameCurrentSessionInLocalStorage),
        takeEvery(LOGIN, onLogin),
        takeEvery(LOGOUT, onLogout),
        takeEvery(CHANGE_LANGUAGE, onChangeLanguage),
        takeEvery(LEAVE_SESSION, onLeaveSession),
        takeEvery(ADD_POST, addPost),
        takeEvery(CREATE_SESSION, createSession),
        takeEvery(LIKE, like)
    ];
}
