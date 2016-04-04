import { PropTypes } from 'react';
import Component from '../Component';
import { connect } from 'react-redux';
import PostBoard from '../components/PostBoard';
import { autoJoin } from '../state/session';

const stateToProps = state => ({ });

const actionsToProps = dispatch => ({
    autoJoin: sessionId => dispatch(autoJoin(sessionId))
});

@connect(stateToProps, actionsToProps)
class Main extends Component {
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

export default Main;
