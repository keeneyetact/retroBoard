import uuid from 'node-uuid';
import findIndex from 'lodash/findIndex';

export const ADD_POST = 'ADD_POST';
export const ADD_TEST_DATA = 'ADD_TEST_DATA';
export const RECEIVE_POST = 'RECEIVE_POST';
export const RECEIVE_BOARD = 'RECEIVE_BOARD';
export const RECEIVE_DELETE_POST = 'RECEIVE_DELETE_POST';
export const DELETE_POST = 'DELETE_POST';
export const LIKE = 'LIKE';
export const RECEIVE_LIKE = 'RECEIVE_LIKE';

export default function reducer(state = [], action) {
    switch (action.type) {
        case ADD_POST:
        case RECEIVE_POST:
            return [
                ...state,
                action.data
            ];
        case RECEIVE_BOARD:
            return action.data;
        case DELETE_POST:
        case RECEIVE_DELETE_POST:
            return state.filter(p => p.id !== action.data.id);
        case LIKE:
        case RECEIVE_LIKE:
            const index = findIndex(state, p => p.id === action.data.post.id);
            return index > -1 ? [
                ...state.slice(0, index),
                postReducer(state[index], action),
                ...state.slice(index + 1)
            ] : state;
        default:
            return state;
    }
}

const postReducer = (state = {}, action) => {
    switch (action.type) {
        case LIKE:
        case RECEIVE_LIKE:
            return {
                ...state,
                votes: state.votes + action.data.count
            };
        default:
            return state;
    }
}

export const addPost = (postType, content) => (dispatch, getState) => {
    const state = getState();

    dispatch({
        type: ADD_POST,
        data: {
            id: uuid.v1(),
            sessionId: state.session.id,
            postType,
            content,
            user: state.user.name,
            votes: 0
        }
    });
}

export const deletePost = post => ({
    type: DELETE_POST,
    data: post
})

export const like = post => ({
    type: LIKE,
    data: {
        post,
        count: 1
    }
});

export const unlike = post => ({
    type: LIKE,
    data: {
        post,
        count: -1
    }
});
