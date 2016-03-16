import { default as React, PropTypes } from 'react';
import Post from './Post';
import PostAdd from './PostAdd';

class PostColumn extends React.Component {
    render() {
        return (
            <div>
                <PostAdd onAdd={this.addPost.bind(this)}/>
            <div className="column-content">
                { this.props.posts.map((post, index) => <Post content={post.content} type={this.props.type} key={index} />)}
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
    onAdd: PropTypes.func
}

PostColumn.defaultProps = {
    posts: [],
    type: 'well',
    onAdd: () => {}
}

export default PostColumn;
