import React, { Component } from 'react';
import shallowCompare from 'react-addons-shallow-compare';

export default class FastComponent extends Component {
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return shallowCompare(this, nextProps, nextState) ||
               nextContext.currentLanguage !== this.context.currentLanguage;
    }
}

FastComponent.contextTypes = {
    currentLanguage: React.PropTypes.string
};
