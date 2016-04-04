import { Component } from 'react';
import shallowCompare from 'react-addons-shallow-compare';

export default class FastComponent extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        const name = this.constructor.name;
        const shouldUpdate = shallowCompare(this, nextProps, nextState);
        console.log('Should update '+name, shouldUpdate)
        if (name === 'PostColumn') {
            console.log('State before: ', this.state);
            console.log('State after: ', nextState);
            console.log('Props before: ', this.props);
            console.log('Props after: ', nextProps);
        }
        return shouldUpdate;
    }
}
