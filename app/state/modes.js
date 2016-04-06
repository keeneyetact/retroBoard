import { createAction } from 'redux-actions';

export const TOGGLE_SUMMARY_MODE = 'TOGGLE_SUMMARY_MODE';

export default function reducer(state = {
    summaryMode: false
} , action) {
    switch (action.type) {
        case TOGGLE_SUMMARY_MODE:
            return {
                ... state,
                summaryMode: !state.summaryMode
            };
        default:
            return state;
    }
}

export const toggleSummaryMode = createAction(TOGGLE_SUMMARY_MODE);
