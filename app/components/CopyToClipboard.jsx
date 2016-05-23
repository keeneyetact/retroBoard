import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Button from 'react-toolbox/lib/button';
import Dialog from 'react-toolbox/lib/dialog';
import flow from 'lodash/flow';
import { getCurrentUrl, shouldDisplayDrawerButton, isInviteDialogOpen } from '../selectors';
import Clipboard from 'react-copy-to-clipboard';
import icons from '../constants/icons';
import { toggleInviteDialog } from '../state/invite';

const stateToProps = state => ({
    url: getCurrentUrl(state),
    showInvite: shouldDisplayDrawerButton(state),
    dialogOpen: isInviteDialogOpen(state)
});

const actionsToProps = dispatch => ({
    toggle: () => dispatch(toggleInviteDialog())
});

const CopyToClipboard = ({ url, showInvite, dialogOpen, toggle }) => {
    if (!showInvite) {
        return null;
    }

    return (
        <span>
            <Button icon={icons.group_add} label="Invite" flat primary
              onClick={toggle}
            />
            <CopyDialog url={url} dialogOpen={dialogOpen} toggle={toggle} />
        </span>
    );
};

const CopyDialog = ({ url, dialogOpen, toggle }) => (
    <Dialog
      active={dialogOpen}
      title="Invite people to your retrospective"
      onEscKeyDown={toggle}
      onOverlayClick={toggle}
      actions={[
          { label: 'Ok', onClick: toggle }
      ]}
    >
        <p>
            To invite people to your Retrospective session, simply give them the following URL:
            <br />
            <strong>{url}</strong>
        </p>
        <br />
        <Clipboard text={url}>
            <Button
              icon={icons.content_copy} label="Or copy URL to Clipboard" flat primary accent
            />
        </Clipboard>
    </Dialog>
);

CopyDialog.propTypes = {
    url: PropTypes.string,
    dialogOpen: PropTypes.bool,
    toggle: PropTypes.func
};

CopyToClipboard.propTypes = {
    url: PropTypes.string,
    showInvite: PropTypes.bool,
    dialogOpen: PropTypes.bool,
    toggle: PropTypes.func
};

const decorators = flow([
    connect(stateToProps, actionsToProps)
]);

export default decorators(CopyToClipboard);
