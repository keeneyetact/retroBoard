

export const CREATE = 'CREATE_SESSION';
export const JOIN = 'JOIN_SESSION';

export default function reducer(state = {
    id: null,
    name: null
} , action) {
    switch (action.type) {
        case CREATE:
            return state;
        case JOIN:
            return state;
        default:
            return state;
    }
}
