import { default as React, PropTypes } from 'react';
import Post from './Post';
import PostAdd from './PostAdd';

class PostColumn extends React.Component {
    render() {
        return (
            <div>
                <PostAdd onAdd={this.addPost.bind(this)} placeholder={this.props.placeholder} />
                <div className="column-content">
                    { this.props.posts.map((post, index) => <Post currentUser={this.props.currentUser} user={post.user} content={post.content} type={this.props.type} postId={post.id} post={post} onDelete={this.props.onDelete} key={index} />)}
                </div>
            </div>
        )
    }

    addPost (text) {
        this.props.onAdd(this.props.type, text);
    }
}

PostColumn.propTypes = {
    currentUser: PropTypes.string.isRequired,
    posts: PropTypes.array.isRequired,
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    onAdd: PropTypes.func,
    onDelete: PropTypes.func
}

PostColumn.defaultProps = {
    currentUser: null,
    posts: [],
    type: 'well',
    placeholder: 'New Comment',
    onAdd: () => {},
    onDelete: () => {}
}

export default PostColumn;
