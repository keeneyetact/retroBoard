import { autoLogin } from './user';
import { autoJoin } from './session';
import { createAction } from 'redux-actions';

export const INITIALISE = 'INITIALISE';
export const initialise = createAction(INITIALISE);
