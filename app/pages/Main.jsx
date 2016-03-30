import { default as React, PropTypes } from 'react';
import { connect } from 'react-redux';
import PostBoard from '../components/PostBoard';
import { autoJoin } from '../state/session';

class Main extends React.Component {
    render() {
        return (
            <div>
                <PostBoard />
            </div>
        )
    }

    componentDidMount() {
        this.props.autoJoin(this.props.params.sessionId);
    }
}

const stateToProps = state => ({ });

const actionsToProps = dispatch => ({
    autoJoin: sessionId => dispatch(autoJoin(sessionId))
});

export default connect(stateToProps, actionsToProps)(Main);
