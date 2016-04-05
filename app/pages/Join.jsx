import { PropTypes } from 'react';
import noop from 'lodash/noop';
import Component from '../Component';
import Input from 'react-toolbox/lib/input';
import Button from 'react-toolbox/lib/button';
import { connect } from 'react-redux';
import { createSession } from '../state/session';
import translate from '../i18n/Translate';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import { Tab, Tabs } from 'react-toolbox';
import icons from '../constants/icons';
import backgroundImage from '../components/images/background.jpg';

const stateToProps = state => ({ });

const actionsToProps = dispatch => ({
    createSession: () => dispatch(createSession()),
    createCustomSession: name => dispatch(createSession(name)),
});

@translate('Join')
@connect(stateToProps, actionsToProps)
class Join extends Component {
    constructor(props) {
        super(props);
        this.state = { tabIndex: 0, customSessionName: '' };
    }
    render() {
        return (
            <div style={{padding: 20 }}>
            <Card raised>
                <CardTitle>Welcome to Retrospected</CardTitle>
                <CardMedia >
                    <img src={backgroundImage} style={{ objectFit: 'cover', maxHeight: 150 }} />
                </CardMedia>
                <CardText>
                    <Tabs index={this.state.tabIndex} onChange={tabIndex => this.setState({ tabIndex })}>
                        <Tab label="Create a Session">
                            Click below and start retrospecting:<br /><br />
                            <Button label={this.props.strings.newSession} accent raised onClick={this.props.createSession} />

                        </Tab>
                        <Tab label="Advanced">
                            <Input label="Enter a name for your session" required icon={icons.create} value={this.state.customSessionName} onChange={v => this.setState({ customSessionName: v })} />
                            <br />
                            <Button label="Create custom session" disabled={!this.state.customSessionName} accent raised onClick={() => this.props.createCustomSession(this.state.customSessionName)} />
                        </Tab>
                    </Tabs>

                </CardText>
            </Card>
        </div>
        );
    }
}

Join.propTypes = {
    createSession: PropTypes.func,
    createCustomSession: PropTypes.func,
    strings: PropTypes.object
};

Join.defaultProps = {
    createSession: noop,
    createCustomSession: noop,
    strings: {
        newSession: 'Create a new session'
    }
}


export default Join;
