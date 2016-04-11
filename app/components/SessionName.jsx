import { PropTypes } from 'react';
import Component from '../Component';
import { connect } from 'react-redux';
import { getSessionName } from '../selectors';
import style from './SessionName.scss';
import EnterInput from './EnterInput';
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
    renameSession: debounce(name => dispatch(renameSession(name)), 500)
});

@translate('Join')
@translate('SessionName')
@connect(stateToProps, actionsToProps)
class SessionName extends Component {
    constructor(props) {
        super(props);
        this.state = { editMode: false };
    }

    render() {
        if (this.state.editMode) {
            return this.renderEditMode();
        } else {
            return this.renderViewMode();
        }
    }

    renderViewMode() {
        const { sessionName, strings } = this.props;

        return (
            <div className={style.sessionName} onClick={() => this.setState({editMode: true}, () => this.refs.input.focus())}>
                <span className={style.name}>{ sessionName || strings.defaultSessionName }&nbsp;<FontIcon className={style.editIcon} value={icons.create} /></span>
            </div>
        );
    }

    renderEditMode() {
        const { sessionName, strings, renameSession } = this.props;
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
                            this.setState({editMode: false});
                            renameSession.flush();
                        }}
                        onKeyPress={e => this.onKeyPress(e.nativeEvent)}
                        onChange={value => {
                            renameSession(value);
                        }}
                    />
                </div>
            </div>
        );
    }

    onKeyPress(e) {
        if (e.keyCode === 13) {
            this.setState({editMode: false});
            this.props.renameSession.flush();
        }
    }
}

SessionName.propTypes = {
    sessionName: PropTypes.string,
    strings: PropTypes.object
};

SessionName.defaultProps = {
    sessionName: null,
    strings: {
        advancedTab: {
            input: 'Enter a name for your session'
        },
        defaultSessionName: 'My Retrospective'
    }
}

export default SessionName;
