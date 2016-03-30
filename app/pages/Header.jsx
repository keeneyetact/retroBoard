import { default as React, PropTypes } from 'react';
import Login from './Login';
import Button from 'react-toolbox/lib/button';
import AppBar from 'react-toolbox/lib/app_bar';
import Navigation from 'react-toolbox/lib/navigation';
import { connect } from 'react-redux';
import { login, logout } from '../state/user';
import { leave } from '../state/session';
import { initialise } from '../state/actions';
import style from './App.scss';
import Clients from './Clients';
import Drawer from 'react-toolbox/lib/drawer';
import icons from '../constants/icons';
import translate from '../i18n/Translate';
import LanguagePicker from '../components/LanguagePicker';
import TranslationProvider from '../i18n/TranslationProvider';
import { push } from 'react-router-redux';
import githubLogo from '../components/images/github.png';

class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            drawerOpen: false
        }
    }

    render() {
        const { strings, goToHomepage } = this.props;
        return (
            <div>
                <AppBar fixed flat>
                    <a onClick={goToHomepage} href="#">Retrospected <br /><span className={style.subtitle}>{ strings.subtitle }</span></a>
                    <Navigation type="horizontal" className={ style.navigation }>
                        <p>{ this.props.user }</p>
                        { this.props.displayDrawerButton ? <Button icon={icons.settings} floating accent mini onClick={() => this.setState({drawerOpen: !this.drawerOpen})} /> : null }
                    </Navigation>
                </AppBar>

                <Drawer active={this.state.drawerOpen} type="right" onOverlayClick={() => this.setState({drawerOpen: false})}>
                    <TranslationProvider>
                        <div style={{margin: '0 10px'}}>
                            <LanguagePicker />
                        </div>
                        <Clients />
                        <br />
                        <br />
                        <Button label={strings.leave} icon={icons.exit_to_app} onClick={this.props.onLeave} accent />
                        <Button label={strings.logout} icon={icons.power_settings_new} onClick={this.props.onLogout} accent />

                        <a href="https://github.com/antoinejaussoin/retro-board" style={{ position: 'absolute', bottom: 10, right: 10 }} target="_blank">Fork me on <img style={{ width: 100, position: "relative", top: 10 }} src={githubLogo} /></a>
                    </TranslationProvider>
                </Drawer>

            </div>
        )
    }
}

Header.propTypes = {
    children: PropTypes.object,
    user: PropTypes.string,
    onLogin: PropTypes.func,
    displayDrawerButton: PropTypes.bool,
    strings: PropTypes.object
};

Header.defaultTypes = {
    children: null,
    user: null,
    onLogin: () => {},
    displayDrawerButton: true,
    strings: {
        subtitle: 'A good way of ranting in an orderly fashion',
        logout: 'Logout',
        leave: 'Leave'
    }
}

const stateToProps = state => ({
    user: state.user.name,
    displayDrawerButton: !!state.user.name && !!state.session.id
});

const actionsToProps = dispatch => ({
    onLogin: user => dispatch(login(user)),
    onLogout: () => dispatch(logout()),
    onLeave: () => dispatch(leave()),
    initialise: sessionId => dispatch(initialise(sessionId)),
    goToHomepage: () => dispatch(push('/'))
});

export default translate('Header')(connect(stateToProps, actionsToProps)(Header));
