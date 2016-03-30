import { default as React, PropTypes } from 'react';
import Login from './Login';
import { connect } from 'react-redux';
import { login, autoLogin } from '../state/user';
import style from './App.scss';
import icons from '../constants/icons';
import TranslationProvider from '../i18n/TranslationProvider';
import Header from './Header';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            drawerOpen: false
        }
    }

    render() {
        return (
            <TranslationProvider>
                <Header />

                <br />
                <br />
                <br />
                <br />
                <br />
                { this.renderLogin() }
            </TranslationProvider>
        )
    }

    renderLogin() {
        if (this.props.user) {
            return this.props.children;
        }
        return (
            <Login onLogin={this.props.onLogin} />
        );
    }

    componentDidMount() {
        this.props.autoLogin();
    }
}

App.propTypes = {
    children: PropTypes.object,
    user: PropTypes.string,
    onLogin: PropTypes.func,
    displayDrawerButton: PropTypes.bool
};

App.defaultTypes = {
    children: null,
    user: null,
    onLogin: () => {},
    displayDrawerButton: true
}

const stateToProps = state => ({
    user: state.user.name,
    currentLanguage: state.user.lang
});

const actionsToProps = dispatch => ({
    onLogin: user => dispatch(login(user)),
    autoLogin: () => dispatch(autoLogin())
});

export default connect(stateToProps, actionsToProps)(App);
