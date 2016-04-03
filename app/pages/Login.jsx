import { Component, PropTypes } from 'react';
import Button from 'react-toolbox/lib/button';
import EnterInput from '../components/EnterInput';
import translate from '../i18n/Translate';
import LanguagePicker from '../components/LanguagePicker';

@translate('Login')
class Login extends Component {
    render() {
        return (
            <section className="grid">
                <div className="col-3-12"></div>
                <div className="col-6-12">
                    <LanguagePicker />
                    <EnterInput placeholder={this.props.strings.namePlaceholder} icon='people' onEnter={this.props.onLogin} ref="input" />
                    <Button label={this.props.strings.buttonLabel} accent raised onClick={() => {
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
    onLogin: PropTypes.func,
    strings: PropTypes.object
}

Login.defaultProps = {
    onLogin: () => {},
    strings: {
        namePlaceholder: 'Who are you exactly? Enter your name here',
        buttonLabel: 'Let\'s start'
    }
}

export default Login;
