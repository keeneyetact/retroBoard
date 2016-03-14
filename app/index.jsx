import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import {ReduxRouter} from 'redux-router';
import {reduxReactRouter} from 'redux-router';
import getRoutes from './routes';
import createHistory from 'history/lib/createBrowserHistory';
import makeRouteHooksSafe from './helpers/makeRouteHooksSafe';

const store = configureStore({}, reduxReactRouter, makeRouteHooksSafe(getRoutes), createHistory);
let component;

if (__DEVTOOLS__){
    const DevTools = require('./pages/DevTools');

    component = <div>
        <Provider store={store}>
            <ReduxRouter routes={getRoutes(store)} />
        </Provider>
        <DevTools />
    </div>;
} else {
    component = <div>
        <Provider store={store}>
            <ReduxRouter routes={getRoutes(store)} />
        </Provider>
    </div>;
}
ReactDOM.render(component, document.getElementById('content'));
