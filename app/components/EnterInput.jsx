import Input from 'react-toolbox/lib/input';
import React, { PropTypes } from 'react';
import Component from '../Component';
import noop from 'lodash/noop';

class EnterInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
    }

    onKeyPress(e) {
        if (e.keyCode === 13) {
            this.props.onEnter(this.state.value);
            this.setState({ value: '' });
        }
    }

    render() {
        return (
            <Input
              type="input"
              label={this.props.placeholder}
              icon={this.props.icon}
              value={this.state.value}
              onChange={value => this.setState({ value })}
              onKeyPress={e => this.onKeyPress(e.nativeEvent)}
              ref="input"
            />
        );
    }
}

EnterInput.propTypes = {
    onEnter: PropTypes.func,
    icon: PropTypes.string,
    placeholder: PropTypes.string
};

EnterInput.defaultProps = {
    onEnter: noop,
    icon: 'add',
    placeholder: 'Type something'
};

export default EnterInput;
