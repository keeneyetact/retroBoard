import Input from 'react-toolbox/lib/input';
import { PropTypes } from 'react';
import Component from '../Component';

class EnterInput extends Component {
    render() {
        return (
            <Input type='input' label={this.props.placeholder} icon={this.props.icon} onKeyPress={e => this.onKeyPress(e.nativeEvent)} ref="input" />
        );
    }

    onKeyPress(e){
        // let's revisit that, shall we...
        const input = this.refs.input.refs.input;
        if (e.keyCode === 13 && input.value) {
            this.props.onEnter(input.value);
            input.value = '';
        }
    }

    value() {
        return this.refs.input.refs.input.value;
    }
}

EnterInput.propTypes = {
    onEnter: PropTypes.func,
    icon: PropTypes.string,
    placeholder: PropTypes.string
}

EnterInput.defaultProps = {
    onEnter: () => {},
    icon: 'add',
    placeholder: 'Type something'
}

export default EnterInput;
