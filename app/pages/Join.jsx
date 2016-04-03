import { Component, PropTypes } from 'react';
import Input from 'react-toolbox/lib/input';
import Button from 'react-toolbox/lib/button';
import { connect } from 'react-redux';
import { createSession } from '../state/session';
import translate from '../i18n/Translate';

const stateToProps = state => ({ });

const actionsToProps = dispatch => ({
    createSession: () => dispatch(createSession())
});

@translate('Join')
@connect(stateToProps, actionsToProps)
class Join extends Component {
    render() {
        return (
            <section className="grid">
                <div className="col-3-12"></div>
                <div className="col-6-12">
                    <Button label={this.props.strings.newSession} accent raised onClick={this.props.createSession} />
                </div>
                <div className="col-3-12"></div>
            </section>
        );
    }
}

Join.propTypes = {
    createSession: PropTypes.func,
    strings: PropTypes.object
};

Join.defaultProps = {
    createSession: () => {},
    strings: {
        newSession: 'Create a new session'
    }
}


export default Join;
