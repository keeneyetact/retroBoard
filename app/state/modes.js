import { createAction } from 'redux-actions';
import { LEAVE_SESSION, JOIN_SESSION, CREATE_SESSION } from './session';
import { AUTO_LOGIN, LOGIN, LOGOUT } from './user';

export const TOGGLE_SUMMARY_MODE = 'TOGGLE_SUMMARY_MODE';

export default function reducer(state = {
    summaryMode: false
}, action) {
    switch (action.type) {
    case TOGGLE_SUMMARY_MODE:
        return {
            ...state,
            summaryMode: !state.summaryMode
        };
    case LEAVE_SESSION:
    case JOIN_SESSION:
    case CREATE_SESSION:
    case AUTO_LOGIN:
    case LOGIN:
    case LOGOUT:
        return {
            ...state,
            summaryMode: false
        };
    default:
        return state;
    }
}

export const toggleSummaryMode = createAction(TOGGLE_SUMMARY_MODE);
