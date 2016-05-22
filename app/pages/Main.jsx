import React, { PropTypes } from 'react';
import noop from 'lodash/noop';
import flow from 'lodash/flow';
import Component from '../Component';
import { connect } from 'react-redux';
import PostBoard from '../components/PostBoard';
import SummaryBoard from '../components/SummaryBoard';
import SessionName from '../components/SessionName';
import { autoJoin } from '../state/session';
import { getSummaryMode } from '../selectors';

const stateToProps = state => ({
    summaryMode: getSummaryMode(state)
});

const actionsToProps = dispatch => ({
    autoJoin: sessionId => dispatch(autoJoin(sessionId))
});

class Main extends Component {

    componentDidMount() {
        this.props.autoJoin(this.props.params.sessionId);
    }

    render() {
        const { summaryMode } = this.props;
        return (
            <div>
                <div style={ { width: '100%', textAlign: 'center' } }>
                    <SessionName />
                </div>
                { summaryMode ? <SummaryBoard /> : <PostBoard /> }
            </div>
        );
    }
}

Main.propTypes = {
    autoJoin: PropTypes.func,
    summaryMode: PropTypes.bool,
    params: PropTypes.object
};

Main.defaultProps = {
    autoJoin: noop,
    summaryMode: false
};

const decorators = flow([
    connect(stateToProps, actionsToProps)
]);

export default decorators(Main);
