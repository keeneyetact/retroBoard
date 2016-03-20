import { default as React, PropTypes } from 'react';
import Login from './Login';
import Button from 'react-toolbox/lib/button';
import AppBar from 'react-toolbox/lib/app_bar';
import Navigation from 'react-toolbox/lib/navigation';
import { connect } from 'react-redux';
import { login } from '../state/user';
import { initialise } from '../state/actions';
import style from './App.scss';
import Clients from './Clients';
import Drawer from 'react-toolbox/lib/drawer';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            drawerOpen: false
        }
    }

    render() {
        return (
            <div>
                <AppBar fixed flat>
                    <a href="/">Retrospected <br /><span className={style.subtitle}>A good way of ranting in an orderly fashion</span></a>
                    <Navigation type="horizontal" className={ style.navigation }>
                        <p>{ this.props.user }</p>
                        { this.props.displayDrawerButton ? <Button icon='people' floating accent mini onClick={() => this.setState({drawerOpen: !this.drawerOpen})} /> : null }
                    </Navigation>
                </AppBar>

                <Drawer active={this.state.drawerOpen} type="right" onOverlayClick={() => this.setState({drawerOpen: false})}>
                    <Clients />
                </Drawer>

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
    onLogin: PropTypes.func,
    displayDrawerButton: PropTypes.bool
};

App.defaultTypes = {
    children: null,
    user: null,
    onLogin: () => {},
    displayDrawerButton: true
}

const stateToProps = state => ({
    user: state.user.name,
    displayDrawerButton: !!state.user.name && !!state.session.id
});

const actionsToProps = dispatch => ({
    onLogin: user => dispatch(login(user)),
    initialise: sessionId => dispatch(initialise(sessionId))
});

export default connect(stateToProps, actionsToProps)(App);
