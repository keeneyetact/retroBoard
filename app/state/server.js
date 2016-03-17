const prefix = 'server/';
export const SEND_NEW_POST = prefix + 'SEND_NEW_POST';
export const RECEIVE_POST = prefix + 'RECEIVE_POST';

export const sendNewPost = (postType, content, user) => ({
    type: SEND_NEW_POST,
    payload: {
        postType,
        user,
        content
    }
});
