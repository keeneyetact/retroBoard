import { createSelector } from 'reselect';

const getPosts = state => state.posts;

const getPostsOfType = type => createSelector(
    getPosts,
    posts => posts.filter(p => p.postType === type)
);

export const getNotWellPosts = getPostsOfType('notWell');
export const getWellPosts = getPostsOfType('well');
export const getIdeasPosts = getPostsOfType('ideas');
export const getCurrentUser = state => state.user.name;
