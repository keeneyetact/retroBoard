import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import noop from 'lodash/noop';
import flow from 'lodash/flow';
import Button from 'react-toolbox/lib/button';
import translate from 'i18n/Translate';
import icons from 'constants/icons';
import { logout } from '../state';

const actionsToProps = dispatch => ({
  onClick: () => dispatch(logout()),
});

const LogoutButton = ({ onClick, strings }) => (
  <Button label={strings.logout} icon={icons.power_settings_new} onClick={onClick} accent />
);

LogoutButton.propTypes = {
  onClick: PropTypes.func,
  strings: PropTypes.object,
};

LogoutButton.defaultProps = {
  onClick: noop,
  strings: {
    logout: 'Logout',
  },
};

const decorators = flow([
  connect(
    null,
    actionsToProps,
  ),
  translate('Header'),
]);

export default decorators(LogoutButton);
