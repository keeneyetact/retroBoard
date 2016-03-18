import { default as React, PropTypes } from 'react';
import Login from './Login';
import Button from 'react-toolbox/lib/button';
import AppBar from 'react-toolbox/lib/app_bar';
import { connect } from 'react-redux';
import { login } from '../state/user';

class App extends React.Component {
    render() {
        return (
            <div>
                <AppBar fixed flat>
                    <a href="/">Agile Board</a>
                </AppBar>
                <br />
                <br />
                <br />
                <br />
                <br />
                { this.renderLogin() }
            </div>
        )
    }

    renderLogin() {
        if (this.props.user) {
            return this.props.children;
        }
        return (
            <Login onLogin={this.props.onLogin} />
        );
    }
}

App.propTypes = {
    children: PropTypes.object,
    user: PropTypes.string,
    onLogin: PropTypes.func
};

App.defaultTypes = {
    children: null,
    user: null,
    onLogin: () => {}
}

const stateToProps = state => ({
    user: state.user.name
});

const actionsToProps = dispatch => ({
    onLogin: user => dispatch(login(user))
});

export default connect(stateToProps, actionsToProps)(App);
