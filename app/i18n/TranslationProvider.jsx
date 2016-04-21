import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

class TranslationProvider extends Component {
    getChildContext() {
        return {
            currentLanguage: this.props.currentLanguage
        };
    }

    render() {
        return <div>{this.props.children}</div>;
    }
}

TranslationProvider.propTypes = {
    children: PropTypes.array,
    currentLanguage: PropTypes.string
};

TranslationProvider.childContextTypes = {
    currentLanguage: PropTypes.string.isRequired
};

const stateToProps = state => ({
    currentLanguage: state.user.lang
});

export default connect(stateToProps)(TranslationProvider);
