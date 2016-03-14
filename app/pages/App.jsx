import { default as React, PropTypes } from 'react';
import Button from 'react-toolbox/lib/button';
import AppBar from 'react-toolbox/lib/app_bar';

class App extends React.Component {
    render() {
        return (
            <div>
                <AppBar fixed flat>
                    <a href="/">Agile Board</a>
                </AppBar>
                {this.props.children}
            </div>
        )
    }
}

App.propTypes = {
    children: PropTypes.object.isRequired
};

export default App;
