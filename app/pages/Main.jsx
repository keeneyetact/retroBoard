import { default as React, PropTypes } from 'react';
import Button from 'react-toolbox/lib/button';
import AppBar from 'react-toolbox/lib/app_bar';
import { connect } from 'react-redux';
import { loadTestData } from '../state/posts';
import PostBoard from '../components/PostBoard';

class Main extends React.Component {
    render() {
        return (
            <div>
                <br />
                <br />
                <br />
                <br />
                <br />
                <Button label="Add some test data" accent raised onClick={() => {
                        console.log('click')
                        this.props.loadTestData();
                    }}/>

                <PostBoard posts={this.props.posts} />
            </div>
        )
    }
}

Main.propTypes = {
    loadTestData: PropTypes.func
}

const actions = dispatch => ({
    loadTestData: () => dispatch(loadTestData())
});

const select = state => ({
    posts: state.posts
});

export default connect(select, actions)(Main);
