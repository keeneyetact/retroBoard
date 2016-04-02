import { takeEvery, takeLatest } from 'redux-saga'
import { AUTO_LOGIN, LOGIN, LOGOUT, CHANGE_LANGUAGE } from '../state/user';
import { AUTO_JOIN, LEAVE_SESSION, CREATE_SESSION } from '../state/session';
import { ADD_POST, LIKE } from '../state/posts';
import { INITIALISE } from '../state/actions';

import { storeUserToLocalStorage, deleteUserFromLocalStorage, storeLanguageToLocalStorage, loginSuccess, changeLanguageSuccess, disconnectUser, autoLoginUser } from './user';
import { addPost, like } from './posts';
import { autoJoinUser, createSession } from './session';

const watchers = [
    function* () { yield* takeEvery(AUTO_LOGIN, autoLoginUser); },
    function* () { yield* takeEvery(AUTO_JOIN, autoJoinUser); },
    function* () { yield* takeEvery(LOGIN, storeUserToLocalStorage); },
    function* () { yield* takeEvery(CHANGE_LANGUAGE, storeLanguageToLocalStorage); },
    function* () { yield* takeEvery(LEAVE_SESSION, disconnectUser); },
    function* () { yield* takeEvery(ADD_POST, addPost); },
    function* () { yield* takeEvery(CREATE_SESSION, createSession); },
    function* () { yield* takeEvery(LIKE, like); }
];

export default watchers;
