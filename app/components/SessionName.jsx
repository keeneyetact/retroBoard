import React, { PropTypes } from 'react';
import noop from 'lodash/noop';
import Component from '../Component';
import { connect } from 'react-redux';
import { getSessionName } from '../selectors';
import style from './SessionName.scss';
import Input from 'react-toolbox/lib/input';
import FontIcon from 'react-toolbox/lib/font_icon';
import { renameSession } from '../state/session';
import translate from '../i18n/Translate';
import icons from '../constants/icons';
import debounce from 'lodash/debounce';

const stateToProps = state => ({
    sessionName: getSessionName(state)
});

const actionsToProps = dispatch => ({
    rename: debounce(name => dispatch(renameSession(name)), 500)
});

@translate('Join')
@translate('SessionName')
@connect(stateToProps, actionsToProps)
class SessionName extends Component {
    constructor(props) {
        super(props);
        this.state = { editMode: false };
    }

    onKeyPress(e) {
        if (e.keyCode === 13) {
            this.setState({ editMode: false });
            this.props.rename.flush();
        }
    }

    renderViewMode() {
        const { sessionName, strings } = this.props;

        return (
            <div
              className={style.sessionName}
              onClick={() => this.setState({ editMode: true }, () => this.refs.input.focus())}
            >
                <span className={style.name}>
                    { sessionName || strings.defaultSessionName }&nbsp;
                    <FontIcon className={style.editIcon} value={icons.create} />
                </span>
            </div>
        );
    }

    renderEditMode() {
        const { sessionName, strings, rename } = this.props;
        return (
            <div className={style.sessionName}>
                <div className={style.edit}>
                    <Input
                      ref="input"
                      label={strings.advancedTab.input}
                      maxLength={50}
                      icon={icons.create}
                      defaultValue={sessionName}
                      onBlur={() => {
                          this.setState({ editMode: false });
                          rename.flush();
                      }}
                      onKeyPress={e => this.onKeyPress(e.nativeEvent)}
                      onChange={value => {
                          rename(value);
                      }}
                    />
                </div>
            </div>
        );
    }

    render() {
        if (this.state.editMode) {
            return this.renderEditMode();
        }
        return this.renderViewMode();
    }
}

SessionName.propTypes = {
    sessionName: PropTypes.string,
    rename: PropTypes.func,
    strings: PropTypes.object
};

SessionName.defaultProps = {
    sessionName: null,
    rename: noop,
    strings: {
        advancedTab: {
            input: 'Enter a name for your session'
        },
        defaultSessionName: 'My Retrospective'
    }
};

export default SessionName;
