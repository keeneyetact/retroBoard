import EnterInput from './EnterInput';
import { Component, PropTypes } from 'react';

class PostAdd extends Component {
    render() {
        return (
            <div>
                <EnterInput placeholder={this.props.placeholder} icon={this.props.icon} onEnter={this.props.onAdd} />
            </div>
        );
    }
}

PostAdd.propTypes = {
    onAdd: PropTypes.func,
    placeholder: PropTypes.string,
    icon: PropTypes.string
}

PostAdd.defaultProps = {
    onAdd: () => {},
    placeholder: 'New comment',
    icon: 'add_circle'
}

export default PostAdd;
