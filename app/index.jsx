import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';
import {
    App,
    Main
} from './pages';

const store = configureStore({}, browserHistory);

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
            <Router history={browserHistory}>
                <Route path="/" component={App}>
                  <IndexRoute component={Main}/>
                </Route>
            </Router>
        );
    }

}

export default Index;
