import { default as React, PropTypes } from 'react';
import Login from './Login';
import Button from 'react-toolbox/lib/button';
import AppBar from 'react-toolbox/lib/app_bar';
import Navigation from 'react-toolbox/lib/navigation';
import { connect } from 'react-redux';
import { login } from '../state/user';
import { initialise } from '../state/actions';
import style from './App.scss';

class App extends React.Component {
    render() {
        return (
            <div>
                <AppBar fixed flat>
                    <a href="/">Retrospected - A good way of ranting in an orderly fashion</a>
                    <Navigation type="horizontal" className={ style.navigation }>
                        <p>{ this.props.user }</p>
                    </Navigation>
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

    componentDidMount() {
        this.props.initialise(this.props.params.sessionId);
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
    onLogin: user => dispatch(login(user)),
    initialise: sessionId => dispatch(initialise(sessionId))
});

export default connect(stateToProps, actionsToProps)(App);
