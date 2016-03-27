import ls from 'local-storage';
import { takeEvery, takeLatest } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import { LOGIN, JOIN_SESSION } from '../state/user';

function* whenAUserLogsIn(action, b, c) {
    yield* takeEvery('LOGIN', storeUserToLocalStorage);
}

function* storeUserToLocalStorage(action) {
    ls('username', action.payload.name);
}

export default [
    whenAUserLogsIn
]
