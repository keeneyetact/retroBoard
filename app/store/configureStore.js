import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { syncHistoryWithStore } from 'react-router-redux';
import DevTools from '../pages/DevTools';
import io from 'socket.io-client';
import reducers from '../state';
import sagas from '../sagas';
import { routerMiddleware } from 'react-router-redux';
import { socketIoMiddleware} from '../middlewares/socketio';
import createSagaMiddleware from 'redux-saga'

export default function configureStore(initialState = {}, browserHistory) {

    const middlewares = [];
    middlewares.push(thunk);
    middlewares.push(routerMiddleware(browserHistory));
    middlewares.push(socketIoMiddleware);
    middlewares.push(createSagaMiddleware(...sagas));

    if (__DEVELOPMENT__) {
        const createLogger = require('redux-logger');
        const logger = createLogger();
        middlewares.push(logger);
    }

    if (__USE_GA__) {
        const { googleAnalyticsMiddleware} = require('../middlewares/ga');
        middlewares.push(googleAnalyticsMiddleware);
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
