import { default as React, PropTypes } from 'react';
import Post from './Post';
import PostAdd from './PostAdd';

class PostColumn extends React.Component {
    render() {
        return (
            <div>
                <PostAdd onAdd={this.addPost.bind(this)} placeholder={this.props.placeholder} />
            <div className="column-content">
                { this.props.posts.map((post, index) => <Post user={post.user} content={post.content} type={this.props.type} key={index} />)}
            </div>
            </div>
        )
    }

    addPost (text) {
        this.props.onAdd(this.props.type, text);
    }
}

PostColumn.propTypes = {
    posts: PropTypes.array.isRequired,
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    onAdd: PropTypes.func
}

PostColumn.defaultProps = {
    posts: [],
    type: 'well',
    placeholder: 'New Comment',
    onAdd: () => {}
}

export default PostColumn;
