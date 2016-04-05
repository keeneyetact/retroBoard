import Input from 'react-toolbox/lib/input';
import { PropTypes } from 'react';
import Component from '../Component';
import noop from 'lodash/noop';

class EnterInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        }
    }
    render() {
        return (
            <Input type='input'
                   label={this.props.placeholder}
                   icon={this.props.icon}
                   value={this.state.value}
                   onChange={value => this.setState({ value })}
                   onKeyPress={e => this.onKeyPress(e.nativeEvent)}
                   ref="input" />
        );
    }

    onKeyPress(e) {
        if (e.keyCode === 13) {
            this.props.onEnter(this.state.value);
            this.setState({ value: '' });
        }
    }
}

EnterInput.propTypes = {
    onEnter: PropTypes.func,
    icon: PropTypes.string,
    placeholder: PropTypes.string
}

EnterInput.defaultProps = {
    onEnter: noop,
    icon: 'add',
    placeholder: 'Type something'
}

export default EnterInput;
