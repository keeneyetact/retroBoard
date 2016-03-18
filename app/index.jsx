import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { syncHistoryWithStore } from 'react-router-redux';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';
import {
    App,
    Main,
    Join
} from './pages';

const store = configureStore({}, browserHistory);
const history = syncHistoryWithStore(browserHistory, store);

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
