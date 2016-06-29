/* eslint no-confusing-arrow:0 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import translate from '../../i18n/Translate';
import noop from 'lodash/noop';
import flow from 'lodash/flow';
import Button from 'react-toolbox/lib/button';
import icons from '../../constants/icons';
import { shouldDisplayDrawerButton } from '../../selectors';
import { openDrawer } from '../../state/modes';


const stateToProps = state => ({
    displayDrawerButton: shouldDisplayDrawerButton(state)
});

const actionsToProps = dispatch => ({
    onClick: () => dispatch(openDrawer())
});

const OpenDrawerButton = ({ displayDrawerButton, onClick }) => displayDrawerButton ? (
    <Button icon={icons.code}
      floating
      accent
      mini
      onClick={onClick}
    />
  ) : null;

OpenDrawerButton.propTypes = {
    displayDrawerButton: PropTypes.bool,
    onClick: PropTypes.func
};

OpenDrawerButton.defaultProps = {
    displayDrawerButton: false,
    onClick: noop
};

const decorators = flow([
    connect(stateToProps, actionsToProps),
    translate('Header')
]);

export default decorators(OpenDrawerButton);
