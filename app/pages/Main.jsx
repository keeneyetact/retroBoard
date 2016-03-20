import { default as React, PropTypes } from 'react';
import { connect } from 'react-redux';
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

export default Main;
