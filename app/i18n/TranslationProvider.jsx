import { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

class TranslationProvider extends Component {
    render() {
        return <div>{this.props.children}</div>;
    }

    getChildContext() {
        return {
            currentLanguage: this.props.currentLanguage
        };
    }
}

TranslationProvider.propTypes = {
    children: PropTypes.array
};

TranslationProvider.childContextTypes = {
    currentLanguage: PropTypes.string.isRequired
};

const stateToProps = state => ({
    currentLanguage: state.user.lang
})


export default connect(stateToProps)(TranslationProvider);
