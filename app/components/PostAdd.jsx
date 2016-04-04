import EnterInput from './EnterInput';
import { PropTypes } from 'react';
import Component from '../Component';
import noop from 'lodash/noop';

class PostAdd extends Component {
    render() {
        return (
            <div>
                <EnterInput placeholder={this.props.placeholder} icon={this.props.icon} onEnter={this.props.onAdd} style={{ tabOrder: this.props.tabOrder }} />
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
    onAdd: noop,
    placeholder: 'New comment',
    icon: 'add_circle'
}

export default PostAdd;
