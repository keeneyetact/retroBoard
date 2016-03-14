import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({

    router: routerStateReducer,
    form: formReducer
});

export default rootReducer;
