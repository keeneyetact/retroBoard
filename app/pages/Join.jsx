import { Component, PropTypes } from 'react';
import Input from 'react-toolbox/lib/input';
import Button from 'react-toolbox/lib/button';
import { connect } from 'react-redux';
import { createSession } from '../state/session';

class Join extends Component {
    render() {
        return (
            <section>
                <h2>Create or Join a session</h2>

                <h3>Create</h3>
                <Button label="Create a new session" accent raised onClick={this.props.createSession} />

                <h3>Join</h3>
            </section>
        );
    }
}

Join.propTypes = {
    createSession: PropTypes.func
}

const stateToProps = state => ({

});

const actionsToProps = dispatch => ({
    createSession: () => dispatch(createSession())
});

export default connect(stateToProps, actionsToProps)(Join);
