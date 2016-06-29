import React, { PropTypes } from 'react';
import noop from 'lodash/noop';
import flow from 'lodash/flow';
import AppBar from 'react-toolbox/lib/app_bar';
import Navigation from 'react-toolbox/lib/navigation';
import { connect } from 'react-redux';
import style from './Header.scss';
import Invite from './Invite';
import translate from '../../i18n/Translate';
import { push } from 'react-router-redux';
import { getCurrentUser } from '../../selectors';
import Drawer from '../drawer/Drawer';
import OpenDrawerButton from './OpenDrawerButton';

const stateToProps = state => ({
    user: getCurrentUser(state)
});

const actionsToProps = dispatch => ({
    goToHomepage: () => dispatch(push('/'))
});

const Header = ({ strings, goToHomepage, user }) => (
    <div>
        <AppBar fixed flat className={style.header}>
            <a onClick={goToHomepage} href="#">Retrospected <br />
                <span className={style.subtitle}>{ strings.subtitle }</span>
            </a>
            <div className={ style.invite }>
                <Invite />
            </div>
            <Navigation type="horizontal" className={ style.navigation }>
                <p>{ user }</p>
                <OpenDrawerButton />
            </Navigation>
        </AppBar>

        <Drawer />
    </div>
);

Header.propTypes = {
    user: PropTypes.string,
    goToHomepage: PropTypes.func,
    strings: PropTypes.object
};

Header.defaultTypes = {
    user: null,
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
