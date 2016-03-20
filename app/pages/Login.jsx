import { Component, PropTypes } from 'react';
import Input from 'react-toolbox/lib/input';
import Button from 'react-toolbox/lib/button';
import EnterInput from '../components/EnterInput';

export default class Login extends Component {
    render() {
        return (
            <section className="grid">
                <div className="col-3-12"></div>
                <div className="col-6-12">
                    <EnterInput placeholder='Who are you exactly? Enter your name here' icon='people' onEnter={this.props.onLogin} ref="input" />
                    <Button label="Let's start" accent raised onClick={() => {
                        const text = this.refs.input.value();
                        if (text) {
                            this.props.onLogin(text);
                        }
                    }} />
                </div>
                <div className="col-3-12"></div>
            </section>
        );
    }
}

Login.propTypes = {
    onLogin: PropTypes.func
}

Login.defaultProps = {
    onLogin: () => {}
}
