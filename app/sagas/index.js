import { takeEvery, takeLatest } from 'redux-saga'
import { LOGIN, LOGOUT, CHANGE_LANGUAGE } from '../state/user';
import { LEAVE_SESSION, CREATE_SESSION } from '../state/session';
import { ADD_POST } from '../state/posts';
import { INITIALISE } from '../state/actions';

import { storeUserToLocalStorage, deleteUserFromLocalStorage, storeLanguageToLocalStorage, loginSuccess, changeLanguageSuccess, disconnectUser, autoLoginUser } from './user';
import { addPost } from './posts';
import { autoJoinUser, createSession } from './session';
import { initialiseApp } from './init';

function* whenTheAppInitialises() { yield* takeEvery(INITIALISE, initialiseApp); }

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

export default [
    whenTheAppInitialises,
    whenAUserLogsIn,
    whenAUserLogsOut,
    whenAUserChangesItsLanguage,
    whenAUserLeavesTheSession,
    whenAUserPosts,
    whenCreatingASession
];
