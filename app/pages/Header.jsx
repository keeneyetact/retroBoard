import React, { PropTypes, Component } from 'react';
import noop from 'lodash/noop';
import flow from 'lodash/flow';
import Button from 'react-toolbox/lib/button';
import AppBar from 'react-toolbox/lib/app_bar';
import Navigation from 'react-toolbox/lib/navigation';
import { connect } from 'react-redux';
import style from './Header.scss';
import Invite from '../components/Invite';
import icons from '../constants/icons';
import translate from '../i18n/Translate';
import { push } from 'react-router-redux';
import { getCurrentUser, shouldDisplayDrawerButton } from '../selectors';

import Drawer from './Drawer';


const stateToProps = state => ({
    user: getCurrentUser(state),
    displayDrawerButton: shouldDisplayDrawerButton(state)
});

const actionsToProps = dispatch => ({
    goToHomepage: () => dispatch(push('/'))
});

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
        const { strings, goToHomepage } = this.props;
        return (
            <div>
                <AppBar fixed flat className={style.header}>
                    <a onClick={goToHomepage} href="#">Retrospected <br />
                        <span className={style.subtitle}>{ strings.subtitle }</span>
                    </a>
                    <div className={ style.invite }>
                        <Invite />
                    </div>
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

                <Drawer open={this.state.drawerOpen}
                  onChange={drawerOpen => this.setState({ drawerOpen })}
                />
            </div>
        );
    }
}

Header.propTypes = {
    user: PropTypes.string,
    displayDrawerButton: PropTypes.bool,
    goToHomepage: PropTypes.func,
    strings: PropTypes.object
};

Header.defaultTypes = {
    user: null,
    displayDrawerButton: true,
    goToHomepage: noop,
    strings: {
        subtitle: 'A good way of ranting in an orderly fashion'
    }
};

const decorators = flow([
    connect(stateToProps, actionsToProps),
    translate('Header')
]);

export default decorators(Header);
