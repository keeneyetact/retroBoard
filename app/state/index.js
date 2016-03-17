import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import posts from './posts';
import session from './session';
import { routeReducer } from 'redux-simple-router'

const rootReducer = combineReducers({
    form: formReducer,
    posts,
    session,
    routing: routeReducer
});

export default rootReducer;
