import { Component, PropTypes } from 'react';
import Input from 'react-toolbox/lib/input';
import Button from 'react-toolbox/lib/button';

export default class Login extends Component {
    render() {
        return (
            <section>
                <h2>Let's meet properly</h2>
                <Input type='input' label='Your name' name='name' icon='people' ref='input' />
                <Button label="Login" accent raised onClick={() => {
                    const text = this.refs.input.refs.input.value;
                    if (text) {
                        this.props.onLogin(text);
                    }
                }} />
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
