import { takeEvery, takeLatest } from 'redux-saga'
import { LOGIN, LOGOUT, CHANGE_LANGUAGE } from '../state/user';
import { LEAVE_SESSION, CREATE_SESSION } from '../state/session';
import { ADD_POST } from '../state/posts';
import { INITIALISE } from '../state/actions';

import { storeUserToLocalStorage, deleteUserFromLocalStorage, storeLanguageToLocalStorage, loginSuccess, changeLanguageSuccess, disconnectUser, autoLoginUser } from './user';
import { addPost } from './posts';
import { autoJoinUser, createSession } from './session';
import { initialiseApp } from './init';

const watchers = [
    function* () { yield* takeEvery(INITIALISE, initialiseApp); },
    function* () { yield* takeEvery(LOGIN, storeUserToLocalStorage); },
    function* () { yield* takeEvery(CHANGE_LANGUAGE, storeLanguageToLocalStorage); },
    function* () { yield* takeEvery(LEAVE_SESSION, disconnectUser); },
    function* () { yield* takeEvery(ADD_POST, addPost); },
    function* () { yield* takeEvery(CREATE_SESSION, createSession); }
];

export default watchers;
