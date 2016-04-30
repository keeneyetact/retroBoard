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
    deleteUserFromLocalStorage,
    storeLanguageToLocalStorage,
    disconnectUser,
    autoLoginUser,
    loginUser } from './user';
import { addPost, like } from './posts';
import { autoJoinUser, createSession, renameCurrentSessionInLocalStorage } from './session';

export default function* rootSaga() {
    yield [
        takeEvery(AUTO_LOGIN, autoLoginUser),
        takeEvery(AUTO_JOIN, autoJoinUser),
        takeEvery(RECEIVE_SESSION_NAME, renameCurrentSessionInLocalStorage),
        takeEvery(RENAME_SESSION, renameCurrentSessionInLocalStorage),
        takeEvery(LOGIN, loginUser),
        takeEvery(LOGOUT, deleteUserFromLocalStorage),
        takeEvery(CHANGE_LANGUAGE, storeLanguageToLocalStorage),
        takeEvery(LEAVE_SESSION, disconnectUser),
        takeEvery(ADD_POST, addPost),
        takeEvery(CREATE_SESSION, createSession),
        takeEvery(LIKE, like)
    ];
}
