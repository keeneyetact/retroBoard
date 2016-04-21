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

const watchers = [
    function* () { yield* takeEvery(AUTO_LOGIN, autoLoginUser); },
    function* () { yield* takeEvery(AUTO_JOIN, autoJoinUser); },
    function* () { yield* takeEvery(RECEIVE_SESSION_NAME, renameCurrentSessionInLocalStorage); },
    function* () { yield* takeEvery(RENAME_SESSION, renameCurrentSessionInLocalStorage); },
    function* () { yield* takeEvery(LOGIN, loginUser); },
    function* () { yield* takeEvery(LOGOUT, deleteUserFromLocalStorage); },
    function* () { yield* takeEvery(CHANGE_LANGUAGE, storeLanguageToLocalStorage); },
    function* () { yield* takeEvery(LEAVE_SESSION, disconnectUser); },
    function* () { yield* takeEvery(ADD_POST, addPost); },
    function* () { yield* takeEvery(CREATE_SESSION, createSession); },
    function* () { yield* takeEvery(LIKE, like); }
];

export default watchers;
