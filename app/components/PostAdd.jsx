import Input from 'react-toolbox/lib/input';
import { Component, PropTypes } from 'react';

class PostAdd extends Component {
    render() {
        return (
            <div>
                <Input type='input' label='New comment' name='comment' icon='add_circle' onKeyPress={e => this.onKeyPress(e.nativeEvent)} ref="input" />
            </div>
        );
    }

    onKeyPress(e){
        // let's revisit that, shall we...
        if (e.keyCode === 13) {
            this.props.onAdd(this.refs.input.refs.input.value);
            this.refs.input.refs.input.value = '';
        }
    }
}

PostAdd.propTypes = {
    onAdd: PropTypes.func
}

PostAdd.defaultProps = {
    onAdd: () => {}
}

export default PostAdd;
