import { PropTypes } from 'react';
import Component from '../Component';
import { connect } from 'react-redux';
import { getSessionName } from '../selectors';
import style from './SessionName.scss';

const stateToProps = state => ({
    sessionName: getSessionName(state)
});

const actionsToProps = dispatch => ({});

@connect(stateToProps, actionsToProps)
class SessionName extends Component {
    render() {
        const { sessionName } = this.props;
        if (!sessionName) {
            return null;
        }
        return (
            <div className={style.sessionName}><span className={style.name}>{sessionName}</span></div>
        );
    }
}

SessionName.propTypes = {
    sessionName: PropTypes.string
};

SessionName.defaultProps = {
    sessionName: null
}

export default SessionName;
