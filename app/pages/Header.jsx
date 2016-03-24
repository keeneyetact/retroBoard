import { default as React, PropTypes } from 'react';
import Login from './Login';
import Button from 'react-toolbox/lib/button';
import AppBar from 'react-toolbox/lib/app_bar';
import Navigation from 'react-toolbox/lib/navigation';
import { connect } from 'react-redux';
import { login } from '../state/user';
import { initialise } from '../state/actions';
import style from './App.scss';
import Clients from './Clients';
import Drawer from 'react-toolbox/lib/drawer';
import icons from '../constants/icons';
import translate from '../i18n/Translate';
import LanguagePicker from '../components/LanguagePicker';

class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            drawerOpen: false
        }
    }

    render() {
        const { strings } = this.props;
        return (
            <div>
                <AppBar fixed flat>
                    <a href="/">Retrospected <br /><span className={style.subtitle}>{ strings.subtitle }</span></a>
                    <Navigation type="horizontal" className={ style.navigation }>
                        <p>{ this.props.user }</p>
                        { this.props.displayDrawerButton ? <Button icon={icons.people} floating accent mini onClick={() => this.setState({drawerOpen: !this.drawerOpen})} /> : null }
                    </Navigation>
                </AppBar>

                <Drawer active={this.state.drawerOpen} type="right" onOverlayClick={() => this.setState({drawerOpen: false})}>
                    <LanguagePicker />
                    <Clients />
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
        subtitle: 'A good way of ranting in an orderly fashion'
    }
}

const stateToProps = state => ({
    user: state.user.name,
    displayDrawerButton: !!state.user.name && !!state.session.id
});

const actionsToProps = dispatch => ({
    onLogin: user => dispatch(login(user)),
    initialise: sessionId => dispatch(initialise(sessionId))
});

export default translate('Header')(connect(stateToProps, actionsToProps)(Header));
