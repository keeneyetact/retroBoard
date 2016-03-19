import { Component, PropTypes } from 'react';
import Input from 'react-toolbox/lib/input';
import Button from 'react-toolbox/lib/button';

export default class Login extends Component {
    render() {
        return (
            <section className="grid">
                <div className="col-3-12"></div>
                <div className="col-6-12">
                    <h2>Who are you exactly?</h2>
                    <Input type='input' label='Your name' name='name' icon='people' ref='input' />
                    <Button label="Let's start" accent raised onClick={() => {
                        const text = this.refs.input.refs.input.value;
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
