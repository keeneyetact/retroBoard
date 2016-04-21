import findIndex from 'lodash/findIndex';
import { LEAVE_SESSION, CREATE_SESSION_SUCCESS, JOIN_SESSION } from './session';
import { createAction } from 'redux-actions';

export const ADD_POST = 'ADD_POST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_TEST_DATA = 'ADD_TEST_DATA';
export const RECEIVE_POST = 'RECEIVE_POST';
export const RECEIVE_BOARD = 'RECEIVE_BOARD';
export const RECEIVE_DELETE_POST = 'RECEIVE_DELETE_POST';
export const DELETE_POST = 'DELETE_POST';
export const LIKE = 'LIKE';
export const LIKE_SUCCESS = 'LIKE_SUCCESS';
export const RECEIVE_LIKE = 'RECEIVE_LIKE';

const postReducer = (state = {}, action) => {
    switch (action.type) {
    case LIKE_SUCCESS:
    case RECEIVE_LIKE: {
        const array = action.payload.like ? 'likes' : 'dislikes';
        return {
            ...state,
            [array]: state[array].concat(action.payload.user)
        };
    }
    default:
        return state;
    }
};

export default function reducer(state = [], action) {
    switch (action.type) {
    case ADD_POST_SUCCESS:
    case RECEIVE_POST:
        return [
            ...state,
            action.payload
        ];
    case RECEIVE_BOARD:
        return action.payload;
    case DELETE_POST:
    case RECEIVE_DELETE_POST:
        return state.filter(p => p.id !== action.payload.id);
    case LIKE_SUCCESS:
    case RECEIVE_LIKE: {
        const index = findIndex(state, p => p.id === action.payload.post.id);
        return index > -1 ? [
            ...state.slice(0, index),
            postReducer(state[index], action),
            ...state.slice(index + 1)
        ] : state;
    }
    case LEAVE_SESSION:
    case CREATE_SESSION_SUCCESS:
    case JOIN_SESSION:
        return [];
    default:
        return state;
    }
}

export const addPost = createAction('ADD_POST', (postType, content) => ({ postType, content }));
export const deletePost = createAction('DELETE_POST');
export const like = createAction('LIKE', post => ({ post, like: true }));
export const unlike = createAction('LIKE', post => ({ post, like: false }));
