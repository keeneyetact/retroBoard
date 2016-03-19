import { Component, PropTypes } from 'react';
import Input from 'react-toolbox/lib/input';
import Button from 'react-toolbox/lib/button';
import { connect } from 'react-redux';
import { createSession } from '../state/session';

class Join extends Component {
    render() {
        return (
            <section className="grid">
                <div className="col-3-12"></div>
                <div className="col-6-12">
                    <h2>Create a session</h2>
                    <br />
                    <Button label="Create a new session" accent raised onClick={this.props.createSession} />
                </div>
                <div className="col-3-12"></div>
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
