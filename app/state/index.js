import { combineReducers } from 'redux';
import posts from './posts';
import session from './session';
import user from './user';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
    posts,
    session,
    user,
    routing: routerReducer
});

export default rootReducer;
