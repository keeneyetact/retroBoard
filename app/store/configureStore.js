import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { apiMiddleware } from 'redux-middleware-api';
import reducer from '../state';
import { syncHistory, routeReducer } from 'redux-simple-router'
import DevTools from '../pages/DevTools';

export default function configureStore(initialState = {}, browserHistory) {
    const reducers = combineReducers(Object.assign({}, reducers, {
        routing: routeReducer
    }));

    let reduxRouterMiddleware = syncHistory(browserHistory);

    const middlewares = [];
    middlewares.push(apiMiddleware);
    middlewares.push(thunk);
    middlewares.push(reduxRouterMiddleware);

    if (__DEVELOPMENT__) {
        const createLogger = require('redux-logger');
        const logger = createLogger();
        middlewares.push(logger);
    }

    let createStoreWithMiddleware = applyMiddleware(...middlewares);

    if (__DEVTOOLS__) {

        createStoreWithMiddleware = compose(
            createStoreWithMiddleware,
            DevTools.instrument()
        );
    }

    const finalCreateStore = createStoreWithMiddleware(createStore);
    const store = finalCreateStore(reducers, initialState);

    reduxRouterMiddleware.listenForReplays(store);

    if (__DEVELOPMENT__) {
        if (module.hot) {
            // Enable Webpack hot module replacement for reducers
            module.hot.accept('../state', () => {
                const nextReducer = require('../state');
                store.replaceReducer(nextReducer);
            });
        }
    }

    return store;
}
