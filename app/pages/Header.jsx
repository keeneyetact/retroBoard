import React, { PropTypes } from 'react';
import noop from 'lodash/noop';
import Component from '../Component';
import Button from 'react-toolbox/lib/button';
import AppBar from 'react-toolbox/lib/app_bar';
import Drawer from 'react-toolbox/lib/drawer';
import Navigation from 'react-toolbox/lib/navigation';
import Switch from 'react-toolbox/lib/switch';
import { connect } from 'react-redux';
import { logout } from '../state/user';
import { leave } from '../state/session';
import { toggleSummaryMode } from '../state/modes';
import style from './App.scss';
import Clients from './Clients';

import icons from '../constants/icons';
import translate from '../i18n/Translate';
import LanguagePicker from '../components/LanguagePicker';
import TranslationProvider from '../i18n/TranslationProvider';
import { push } from 'react-router-redux';
import githubLogo from '../components/images/github.png';
import { getCurrentUser, shouldDisplayDrawerButton, getSummaryMode } from '../selectors';

const stateToProps = state => ({
    user: getCurrentUser(state),
    displayDrawerButton: shouldDisplayDrawerButton(state),
    summaryMode: getSummaryMode(state)
});

const actionsToProps = dispatch => ({
    onLogout: () => dispatch(logout()),
    onLeave: () => dispatch(leave()),
    toggle: () => dispatch(toggleSummaryMode()),
    goToHomepage: () => dispatch(push('/'))
});

@translate('Header')
@connect(stateToProps, actionsToProps)
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            drawerOpen: false
        };
    }

    closeDrawer(fn) {
        return () => {
            fn();
            this.setState({ drawerOpen: false });
        };
    }

    render() {
        const { strings, goToHomepage, summaryMode, toggle } = this.props;
        return (
            <div>
                <AppBar fixed flat>
                    <a onClick={goToHomepage} href="#">Retrospected <br />
                        <span className={style.subtitle}>{ strings.subtitle }</span>
                    </a>
                    <Navigation type="horizontal" className={ style.navigation }>
                        <p>{ this.props.user }</p>
                        { this.props.displayDrawerButton ?
                            <Button icon={icons.code}
                              floating
                              accent
                              mini
                              onClick={() => this.setState({ drawerOpen: !this.drawerOpen })}
                            /> :
                            null }
                    </Navigation>
                </AppBar>

                <Drawer active={this.state.drawerOpen}
                  type="right"
                  onOverlayClick={() => this.setState({ drawerOpen: false })}
                >
                    <TranslationProvider>
                        <div style={{ margin: '0 10px' }}>
                            <LanguagePicker />
                            <Switch checked={summaryMode}
                              onChange={this.closeDrawer(toggle)}
                              label={strings.summaryMode}
                            />
                        </div>

                        <Clients />
                        <br />
                        <br />
                        <Button
                          label={strings.leave}
                          icon={icons.exit_to_app}
                          onClick={this.closeDrawer(this.props.onLeave)}
                          accent
                        />
                        <Button
                          label={strings.logout}
                          icon={icons.power_settings_new}
                          onClick={this.closeDrawer(this.props.onLogout)}
                          accent
                        />

                        <a
                          href="https://github.com/antoinejaussoin/retro-board"
                          style={{ position: 'absolute', bottom: 10, right: 10 }}
                          target="_blank"
                        >
                            Fork me on
                            <img
                              style={{ width: 100, position: 'relative', top: 10 }}
                              src={githubLogo}
                              alt="GitHub"
                            />
                        </a>
                    </TranslationProvider>
                </Drawer>
            </div>
        );
    }
}

Header.propTypes = {
    user: PropTypes.string,
    displayDrawerButton: PropTypes.bool,
    onLogout: PropTypes.func,
    onLeave: PropTypes.func,
    goToHomepage: PropTypes.func,
    strings: PropTypes.object,
    summaryMode: PropTypes.bool,
    toggle: PropTypes.func
};

Header.defaultTypes = {
    user: null,
    displayDrawerButton: true,
    onLogout: noop,
    onLeave: noop,
    goToHomepage: noop,
    summaryMode: false,
    toggle: noop,
    strings: {
        subtitle: 'A good way of ranting in an orderly fashion',
        logout: 'Logout',
        leave: 'Leave',
        summaryMode: 'Summary Mode'
    }
};

export default Header;
