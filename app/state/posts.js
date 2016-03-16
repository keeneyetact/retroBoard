
export const ADD_POST = 'ADD_POST';
export const ADD_TEST_DATA = 'ADD_TEST_DATA';

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
        default:
            return state;
    }
}

const posts = (state = [], action) => {
    switch (action.type) {
        case ADD_POST:
            return [
                ...state, {
                    content: action.content
                }
            ];
        default:
            return state;
    }
}


export const addPost = (postType, content) => {
    return {
        type: ADD_POST,
        postType,
        content
    }
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
