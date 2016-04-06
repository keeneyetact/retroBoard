import { PropTypes } from 'react';
import Component from '../Component';
import { connect } from 'react-redux';
import PostBoard from '../components/PostBoard';
import SummaryBoard from '../components/SummaryBoard';
import { autoJoin } from '../state/session';
import { getSummaryMode } from '../selectors';

const stateToProps = state => ({
    summaryMode: getSummaryMode(state)
});

const actionsToProps = dispatch => ({
    autoJoin: sessionId => dispatch(autoJoin(sessionId))
});

@connect(stateToProps, actionsToProps)
class Main extends Component {
    render() {
        const { summaryMode } = this.props;
        return (
            <div>
                { summaryMode ? <SummaryBoard /> : <PostBoard /> }
            </div>
        )
    }

    componentDidMount() {
        this.props.autoJoin(this.props.params.sessionId);
    }
}

Main.propTypes = {
    autoJoin: PropTypes.func,
    summaryMode: PropTypes.bool
}

export default Main;
