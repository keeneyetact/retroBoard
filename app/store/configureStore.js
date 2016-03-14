import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { apiMiddleware } from 'redux-middleware-api';
import reducer from '../state';
import DevTools from '../pages/DevTools';

export default function configureStore(initialState, reduxReactRouter, getRoutes, createHistory) {
    const middlewares = [];
    middlewares.push(apiMiddleware);
    middlewares.push(thunk);

    if (__DEVELOPMENT__) {
        const createLogger = require('redux-logger');
        const logger = createLogger();
        middlewares.push(logger);
    }

    let createStoreWithMiddleware = applyMiddleware(...middlewares);

    let createStoreWithRouter = compose(
        createStoreWithMiddleware,
        reduxReactRouter({getRoutes, createHistory})
    );

    if (__DEVTOOLS__) {

        createStoreWithRouter = compose(
            createStoreWithRouter,
            DevTools.instrument()
        );
    }

    const finalCreateStore = createStoreWithRouter(createStore);
    const store = finalCreateStore(reducer, initialState);

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
