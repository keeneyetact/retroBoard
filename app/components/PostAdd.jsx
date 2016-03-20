import EnterInput from './EnterInput';
import { Component, PropTypes } from 'react';

class PostAdd extends Component {
    render() {
        return (
            <div>
                <EnterInput placeholder={this.props.placeholder} icon='add_circle' onEnter={this.props.onAdd} />
            </div>
        );
    }
}

PostAdd.propTypes = {
    onAdd: PropTypes.func,
    placeholder: PropTypes.string
}

PostAdd.defaultProps = {
    onAdd: () => {},
    placeholder: 'New comment'
}

export default PostAdd;
