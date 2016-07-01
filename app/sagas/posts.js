import { put, call, select } from 'redux-saga/effects';
import uuid from 'node-uuid';
import { ADD_POST_SUCCESS, LIKE_SUCCESS } from '../state/posts';
import { getCurrentUser } from '../selectors';

export function* onAddPost(action) {
    const user = yield select(getCurrentUser);
    const postId = yield call(uuid.v1);

    yield put({ type: ADD_POST_SUCCESS, payload: {
        id: postId,
        postType: action.payload.postType,
        content: action.payload.content,
        user,
        likes: [],
        dislikes: []
    } });
}

export function* like(action) {
    const user = yield select(state => state.user.name);
    yield put({ type: LIKE_SUCCESS, payload: {
        ...action.payload,
        user
    } });
}
