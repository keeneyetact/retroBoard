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
    createSession: () => dispatch(createSession())
});

@translate('Join')
@connect(stateToProps, actionsToProps)
class Join extends Component {
    constructor(props) {
        super(props);
        this.state = { tabIndex: 0 };
    }
    render() {
        return (
            <div style={{padding: 20 }}>
            <Card raised>
                <CardTitle>Welcome to Retrospected</CardTitle>
                <CardMedia >
                    <img src={backgroundImage} style={{objectFit: 'cover', maxHeight: 150 }} />
                </CardMedia>
                <CardText>
                    <Tabs index={this.state.tabIndex} onChange={tabIndex => this.setState({ tabIndex })}>
                        <Tab label="Create a Session">
                            Click below and start retrospecting:<br /><br />
                            <Button label={this.props.strings.newSession} accent raised onClick={this.props.createSession} />

                        </Tab>
                        <Tab label="Advanced">
                            <Input label="Enter a name for your session" icon={icons.create} />
                            <br />
                            <Button label="Create custom session" accent raised onClick={this.props.createSession} />
                        </Tab>
                    </Tabs>

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
