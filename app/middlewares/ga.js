import ga from 'react-ga';
import { ADD_POST, RECEIVE_BOARD, RECEIVE_POST, RECEIVE_DELETE_POST, DELETE_POST, LIKE, RECEIVE_LIKE } from '../state/posts';
import { JOIN_SESSION, RECEIVE_CLIENT_LIST } from '../state/session';
import { LOGIN } from '../state/user';

export const googleAnalyticsMiddleware = store => next => action => {
    const result = next(action);

    // Each of these actions will be recorded with Google Analytics
    const actions = [ADD_POST, JOIN_SESSION, DELETE_POST, LIKE, LOGIN];

    if (actions.indexOf(action.type) > -1) {
        ga.event({category: 'Action', action: action.type });
    }

    if (action.type === '@@router/LOCATION_CHANGE') {
        ga.pageview(action.payload.pathname);
    }

    return result;
};
