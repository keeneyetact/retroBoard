import { default as React, PropTypes } from 'react';
import Button from 'react-toolbox/lib/button';
import AppBar from 'react-toolbox/lib/app_bar';
import { connect } from 'react-redux';
import { loadTestData, addPost, deletePost } from '../state/posts';
import PostBoard from '../components/PostBoard';

class Main extends React.Component {
    render() {
        return (
            <div>
                <PostBoard />
            </div>
        )
    }
}

Main.propTypes = {

}

export default Main;
