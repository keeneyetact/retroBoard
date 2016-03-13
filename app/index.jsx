import { default as React, PropTypes } from 'react';
import Button from 'react-toolbox/lib/button';

class Index extends React.Component {
    render() {
        return (
            <div>
                <p>Main Page</p>
                <p><Button label="Hello World this is me" raised accent /></p>
                <div>

                </div>
            </div>
        )
    }
}

export default Index;
