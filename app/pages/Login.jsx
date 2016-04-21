import React, { PropTypes } from 'react';
import noop from 'lodash/noop';
import Component from '../Component';
import Button from 'react-toolbox/lib/button';
import EnterInput from '../components/EnterInput';
import translate from '../i18n/Translate';
import LanguagePicker from '../components/LanguagePicker';
import icons from '../constants/icons';

@translate('Login')
class Login extends Component {
    render() {
        return (
            <section className="grid">
                <div className="col-3-12"></div>
                <div className="col-6-12">
                    <LanguagePicker />
                    <EnterInput
                      placeholder={this.props.strings.namePlaceholder}
                      icon={icons.people}
                      onEnter={this.props.onLogin} ref="input"
                    />
                    <Button label={this.props.strings.buttonLabel} accent raised onClick={() => {
                        const text = this.refs.input.state.value;
                        if (text) {
                            this.props.onLogin(text);
                        }
                    }}
                    />
                </div>
                <div className="col-3-12"></div>
            </section>
        );
    }
}

Login.propTypes = {
    onLogin: PropTypes.func,
    strings: PropTypes.object
};

Login.defaultProps = {
    onLogin: noop,
    strings: {
        namePlaceholder: 'Who are you exactly? Enter your name here',
        buttonLabel: 'Let\'s start'
    }
};

export default Login;
