import { default as React, PropTypes } from 'react';
import { connect } from 'react-redux';
import PostBoard from '../components/PostBoard';
import { initialise } from '../state/actions';

class Main extends React.Component {
    render() {
        return (
            <div>
                <PostBoard />
            </div>
        )
    }

    componentDidMount() {
        this.props.initialise(this.props.params.sessionId);
    }
}

const stateToProps = state => ({ });

const actionsToProps = dispatch => ({
    initialise: sessionId => dispatch(initialise(sessionId))
});

export default connect(stateToProps, actionsToProps)(Main);
