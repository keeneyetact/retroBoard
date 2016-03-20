import { autoLogin } from './user';
import { autoJoin } from './session';

export const initialise = sessionId => dispatch => {
    dispatch(autoLogin());
    dispatch(autoJoin(sessionId));
};
