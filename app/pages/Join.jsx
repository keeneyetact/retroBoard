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
import { getSavedSessions, getCurrentUser } from '../selectors';
import SessionTile from '../components/SessionTile'
import { push } from 'react-router-redux';
import { browserHistory } from 'react-router'

const stateToProps = state => ({
    previousSessions: getSavedSessions(getCurrentUser(state))
});

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
        const { strings } = this.props;
        return (
            <div style={{padding: 20 }}>
            <Card raised>
                <CardTitle>{ strings.welcome }</CardTitle>
                <CardMedia >
                    <img src={backgroundImage} style={{ objectFit: 'cover', maxHeight: 150 }} />
                </CardMedia>
                <CardText>
                    <Tabs index={this.state.tabIndex} onChange={tabIndex => this.setState({ tabIndex })}>
                        <Tab label={ strings.standardTab.header }>
                            { strings.standardTab.text }<br /><br />
                            <Button label={ strings.standardTab.button } accent raised onClick={this.props.createSession} />
                        </Tab>
                        <Tab label={ strings.advancedTab.header }>
                            <Input label={ strings.advancedTab.input } required icon={icons.create} value={this.state.customSessionName} maxLength={50} onChange={v => this.setState({ customSessionName: v })} />
                            <br />
                            <Button label={ strings.advancedTab.button } disabled={!this.state.customSessionName} accent raised onClick={() => this.props.createCustomSession(this.state.customSessionName)} />
                        </Tab>
                        <Tab label={ strings.previousTab.header }>
                            { this.props.previousSessions.map((session, index) =>
                                <SessionTile key={session.id} session = {session}>
                                    <Button label={ strings.previousTab.rejoinButton } accent raised onClick={() => browserHistory.push('/session/'+session.id)}/>
                                </SessionTile>
                            )}
                        </Tab>
                    </Tabs>

                </CardText>
            </Card>
        </div>
        );
    }
}

Join.propTypes = {
    previousSessions: PropTypes.array,
    createSession: PropTypes.func,
    createCustomSession: PropTypes.func,
    strings: PropTypes.object
};

Join.defaultProps = {
    previousSessions: [],
    createSession: noop,
    createCustomSession: noop,
    strings: {
        welcome: 'Welcome to Retrospected',
        standardTab: {
            header: 'Create a Session',
            text: 'Click below and start retrospecting:',
            button: 'Create a new session'
        },
        advancedTab: {
            header: 'Advanced',
            input: 'Enter a name for your session',
            button: 'Create custom session'
        },
        previousTab: {
            header: 'Previous sessions',
            rejoinButton: 'Rejoin'
        }
    }
}


export default Join;
