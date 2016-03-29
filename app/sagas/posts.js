import { call, put, select } from 'redux-saga/effects';
import uuid from 'node-uuid';
import { ADD_POST, ADD_POST_SUCCESS } from '../state/posts';

export function* addPost(action) {
    const sessionId = yield select(state => state.session.id);
    const user = yield select(state => state.user.name);
    const postId = uuid.v1();

    yield put({ type: ADD_POST_SUCCESS, payload: {
        id: postId,
        sessionId,
        postType: action.payload.postType,
        content: action.payload.content,
        user,
        votes: 0
    }});
}
