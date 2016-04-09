import { PropTypes } from 'react';
import noop from 'lodash/noop';
import Component from '../Component';
import Login from './Login';
import { connect } from 'react-redux';
import { login, autoLogin } from '../state/user';
import style from './App.scss';
import icons from '../constants/icons';
import TranslationProvider from '../i18n/TranslationProvider';
import Header from './Header';
import { getCurrentUser, getCurrentLanguage } from '../selectors';

const stateToProps = state => ({
    user: getCurrentUser(state),
    currentLanguage: getCurrentLanguage(state)
});

const actionsToProps = dispatch => ({
    onLogin: user => dispatch(login(user)),
    autoLogin: () => dispatch(autoLogin())
});

@connect(stateToProps, actionsToProps)
class App extends Component {
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
    onLogin: noop,
    displayDrawerButton: true
}

export default App;
