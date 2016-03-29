import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { syncHistoryWithStore } from 'react-router-redux';
import { init } from './middlewares/socketio';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';
import config from '../config/configuration.json';
import {
    App,
    Main,
    Join
} from './pages';
import './grids.css';

const store = configureStore({}, browserHistory);
init(store);
const history = syncHistoryWithStore(browserHistory, store);

if (__USE_GA__) {
    const ga = require('react-ga');
    ga.initialize(__GA_ID__);
}

class Index extends React.Component {
    render() {
        let component;
        if (__DEVTOOLS__){
            const DevTools = require('./pages/DevTools').default;

            component = <div>
                <Provider store={store}>
                    <div>
                    { this.renderRoutes() }
                    <DevTools />
                    </div>
                </Provider>

            </div>;
        } else {
            component = <div>
                <Provider store={store}>
                    { this.renderRoutes() }
                </Provider>
            </div>;
        }

        return component;
    }

    renderRoutes() {
        return (
            <Router history={history}>
                <Route path="/" component={App}>
                  <IndexRoute component={Join} />
                  <Route path="session/:sessionId" component={Main} />
                </Route>
            </Router>
        );
    }

}

export default Index;
