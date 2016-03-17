import { takeEvery, takeLatest } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import { ADD_POST } from '../state/posts';
import { sendNewPost } from '../state/server';

function* whenANewPostIsCreated() {
    yield* takeEvery(ADD_POST, sendNewPost);
}

function* sendPostToServer(action) {
    yield call(sendNewPost, action.postType, action.content, action.user);
}

export default [
    whenANewPostIsCreated
]
