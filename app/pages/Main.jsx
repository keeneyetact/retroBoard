import { default as React, PropTypes } from 'react';
import Button from 'react-toolbox/lib/button';
import AppBar from 'react-toolbox/lib/app_bar';
import { connect } from 'react-redux';
import { loadTestData, addPost } from '../state/posts';
import PostBoard from '../components/PostBoard';

class Main extends React.Component {
    render() {
        return (
            <div>
                <PostBoard currentUser={this.props.currentUser} posts={this.props.posts} onAdd={this.props.addPost} />
            </div>
        )
    }
}

Main.propTypes = {
    addPost: PropTypes.func,
    posts: PropTypes.object,
    currentUser: PropTypes.string.isRequired
}

const actions = dispatch => ({
    addPost: (type, text) => dispatch(addPost(type, text)),
});

const select = state => ({
    posts: state.posts,
    currentUser: state.user.name
});

export default connect(select, actions)(Main);
