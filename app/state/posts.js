import uuid from 'node-uuid';

export const ADD_POST = 'ADD_POST';
export const ADD_TEST_DATA = 'ADD_TEST_DATA';
export const RECEIVE_POST = 'RECEIVE_POST';
export const RECEIVE_BOARD = 'RECEIVE_BOARD';

export default function reducer(state = {
    well: [],
    notWell: [],
    improve: []
}, action) {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                [action.postType]: posts(state[action.postType], action)
            };
        case ADD_TEST_DATA:
            return action.data;
        case RECEIVE_POST:
            return {
                ...state,
                [action.data.postType]: posts(state[action.data.postType], action.data)
            };
        case RECEIVE_BOARD:
            return action.data;
        default:
            return state;
    }
}

const posts = (state = [], action) => {
    switch (action.type) {
        case ADD_POST:
            return [
                ...state, {
                    content: action.content,
                    user: action.user,
                    id: action.id
                }
            ];
        default:
            return state;
    }
}


export const addPost = (postType, content) => (dispatch, getState) => {
    const state = getState();

    dispatch({
        type: ADD_POST,
        postType,
        content,
        user: state.user.name,
        sessionId: state.session.id,
        id: uuid.v1()
    });
}

export const loadTestData = () => {
    return {
        type: ADD_TEST_DATA,
        data: {
            well: ['Hello World'].map(createPost),
            notWell: ['This is me'].map(createPost),
            improve: ['The world is my oyster'].map(createPost)
        }
    }
}

const createPost = content => ({
    content,
    votes: 0
});
