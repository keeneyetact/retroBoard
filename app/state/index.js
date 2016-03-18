import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import posts from './posts';
import session from './session';
import user from './user';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
    form: formReducer,
    posts,
    session,
    user,
    routing: routerReducer
});

export default rootReducer;
