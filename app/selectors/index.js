import { createSelector } from 'reselect';

const getPosts = state => state.posts;
const getSessionId = state => state.session.id;

const getPostsOfType = type => createSelector(
    getPosts,
    posts => posts.filter(p => p.postType === type)
);

export const getNotWellPosts = getPostsOfType('notWell');
export const getWellPosts = getPostsOfType('well');
export const getIdeasPosts = getPostsOfType('ideas');
export const getCurrentUser = state => state.user.name;
export const getCurrentLanguage = state => state.user.lang;
export const getClients = state => state.session.clients;
export const shouldDisplayDrawerButton = createSelector(
    [getCurrentUser, getSessionId],
    (user, sessionId) => !!user && !!sessionId
);
