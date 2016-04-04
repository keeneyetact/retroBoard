import { PropTypes } from 'react';
import noop from 'lodash/noop';
import Component from '../Component';
import Input from 'react-toolbox/lib/input';
import Button from 'react-toolbox/lib/button';
import { connect } from 'react-redux';
import { createSession } from '../state/session';
import translate from '../i18n/Translate';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';

const stateToProps = state => ({ });

const actionsToProps = dispatch => ({
    createSession: () => dispatch(createSession())
});

@translate('Join')
@connect(stateToProps, actionsToProps)
class Join extends Component {
    render() {
        return (
            <div style={{padding: 20 }}>
            <Card raised>
                <CardTitle>Welcome to Retrospected</CardTitle>
                <CardText>
                    Create a session right now by clicking:<br /><br />
                <Button label={this.props.strings.newSession} accent raised onClick={this.props.createSession} />
                <br /><br />
                Or choose a custom name to your session:
                <Input />
                <Button label="Create custom session" accent raised onClick={this.props.createSession} />
                </CardText>
            </Card>
        </div>
        );
    }
    render2() {
        return (
            <section className="grid">
                <div className="col-3-12"></div>
                <div className="col-6-12">
                    <Button label={this.props.strings.newSession} accent raised onClick={this.props.createSession} />
                        <Card style={{width: '350px'}} raised>
                            <CardTitle>Welcome to Retrospected</CardTitle>
                            <CardText>Hello</CardText>
                        </Card>
                </div>
                <div className="col-3-12">

                </div>

            </section>
        );
    }
}

Join.propTypes = {
    createSession: PropTypes.func,
    strings: PropTypes.object
};

Join.defaultProps = {
    createSession: noop,
    strings: {
        newSession: 'Create a new session'
    }
}


export default Join;
