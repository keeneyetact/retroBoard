import React, { PropTypes, Component } from 'react';
import noop from 'lodash/noop';
import flow from 'lodash/flow';
import Login from './Login';
import { connect } from 'react-redux';
import { login, autoLogin } from '../state/user';
import Header from './Header';
import { getCurrentUser, getCurrentLanguage } from '../selectors';
import { Layout, Panel } from 'react-toolbox/lib/layout';

const stateToProps = state => ({
    user: getCurrentUser(state),
    currentLanguage: getCurrentLanguage(state)
});

const actionsToProps = dispatch => ({
    onLogin: user => dispatch(login(user)),
    autoLogin: () => dispatch(autoLogin())
});

class App extends Component {
    constructor() {
        super();
        this.state = {
            drawerOpen: false
        };
    }

    componentDidMount() {
        this.props.autoLogin();
    }

    renderLogin() {
        if (this.props.user) {
            return this.props.children;
        }
        return (
            <Login onLogin={this.props.onLogin} />
        );
    }

    render() {
        return (
            <Layout>
                <Panel>
                    <Header />
                    { this.renderLogin() }
                </Panel>
            </Layout>
        );
    }
}

App.propTypes = {
    children: PropTypes.object,
    user: PropTypes.string,
    onLogin: PropTypes.func,
    autoLogin: PropTypes.func,
    displayDrawerButton: PropTypes.bool
};

App.defaultTypes = {
    children: null,
    user: null,
    onLogin: noop,
    displayDrawerButton: true
};

const decorators = flow([
    connect(stateToProps, actionsToProps)
]);

export default decorators(App);
