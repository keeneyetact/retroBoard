import uuid from 'node-uuid';

export const ADD_POST = 'ADD_POST';
export const ADD_TEST_DATA = 'ADD_TEST_DATA';
export const RECEIVE_POST = 'RECEIVE_POST';
export const RECEIVE_BOARD = 'RECEIVE_BOARD';
export const RECEIVE_DELETE_POST = 'RECEIVE_DELETE_POST';
export const DELETE_POST = 'DELETE_POST';

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
        case RECEIVE_DELETE_POST:
        case DELETE_POST:
            return state.filter(p => p.id !== action.data.id);
        default:
            return state;
    }
}

export const addPost = (postType, content) => (dispatch, getState) => {
    const state = getState();

    dispatch({
        type: ADD_POST,
        data: {
            postType,
            content,
            user: state.user.name,
            sessionId: state.session.id,
            id: uuid.v1()
        }
    });
}

export const deletePost = post => ({
    type: DELETE_POST,
    data: post
})
