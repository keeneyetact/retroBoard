/* global __DEVTOOLS__ __USE_GA__ __GA_ID__ */
/* eslint global-require:0 */
import React from 'react';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';
import Board from 'modules/board';
import Home from 'modules/home';
import App from 'modules/app';
import configureStore from './store/configureStore';
import { init } from './middlewares/socketio';
import './grids.css';

const store = configureStore({}, browserHistory);
init(store);
const history = syncHistoryWithStore(browserHistory, store);

if (__USE_GA__) {
    const ga = require('react-ga');
    ga.initialize(__GA_ID__);
}

const routes = (
    <Router history={history}>
        <Route path="/" component={App}>
            <IndexRoute component={Home} />
            <Route path="session/:sessionId" component={Board} />
        </Route>
    </Router>
);

class Index extends React.Component {
    render() {
        let component;
        if (__DEVTOOLS__) {
            const DevTools = require('./components/DevTools').default;

            component = (
                <div>
                    <Provider store={store}>
                        <div>
                            {routes}
                            <DevTools />
                        </div>
                    </Provider>
                </div>
            );
        } else {
            component = (
                <div>
                    <Provider store={store}>
                        {routes}
                    </Provider>
                </div>
            );
        }

        return component;
    }
}

export default Index;
