import { createSelector } from 'reselect';
import sortBy from 'lodash/sortBy';

// Utility functions
const sortByVotes = posts => sortBy(posts, p => -(p.likes.length - p.dislikes.length));
const sortByLastJoin = sessions => sortBy(sessions, s => -s.lastJoin);

// Simple Selectors
export const getPosts = state => state.posts;
export const getSessionId = state => state.session.id;
export const getSummaryMode = state => state.modes.summaryMode;
export const getCurrentUser = state => state.user.name;
export const getCurrentLanguage = state => state.user.lang;
export const getClients = state => state.session.clients;
export const getSessionName = state => state.session.name;
export const getSavedSessions = state => state.session.previousSessions;

// Selector Factories
const getPostsOfType = type => createSelector(getPosts, posts => posts.filter(p => p.postType === type));

// Combined Selectors
export const getNotWellPosts = getPostsOfType('notWell');
export const getWellPosts = getPostsOfType('well');
export const getIdeasPosts = getPostsOfType('ideas');
export const shouldDisplayDrawerButton = createSelector([getCurrentUser, getSessionId], (user, sessionId) => !!user && !!sessionId);
export const getSortedNotWellPosts = createSelector(getNotWellPosts, sortByVotes);
export const getSortedWellPosts = createSelector(getWellPosts, sortByVotes);
export const getSortedIdeasPosts = createSelector(getIdeasPosts, sortByVotes);
export const getSavedSessionsByDate = createSelector(getSavedSessions, sortByLastJoin);
