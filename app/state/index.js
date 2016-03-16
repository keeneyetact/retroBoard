import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import posts from './posts';
import { routeReducer } from 'redux-simple-router'

const rootReducer = combineReducers({
    form: formReducer,
    posts,
    routing: routeReducer
});

export default rootReducer;
