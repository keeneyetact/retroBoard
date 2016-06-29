import React, { PropTypes, Component } from 'react';
import noop from 'lodash/noop';
import flow from 'lodash/flow';
import { connect } from 'react-redux';
import Dropdown from 'react-toolbox/lib/dropdown';
import { changeLanguage } from '../state/user';
import languages from '../i18n/languages.json';
import translate from '../i18n/Translate';
import flags from '../i18n/flags';
import { getCurrentLanguage } from '../selectors';

const stateToProps = state => ({
    currentLanguage: getCurrentLanguage(state)
});

const actionsToProps = dispatch => ({
    changeLanguage: lang => dispatch(changeLanguage(lang))
});

class LanguagePicker extends Component {
    renderItem(item) {
        const containerStyle = {
            display: 'flex',
            flexDirection: 'row'
        };

        const imageStyle = {
            display: 'flex',
            width: '32px',
            height: '32px',
            flexGrow: 0,
            marginRight: '8px'
        };

        const contentStyle = {
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 2
        };

        return (
            <div style={containerStyle}>
                <img src={flags[item.value]} style={imageStyle} alt="Flag" />
                <div style={contentStyle}>
                    <strong>{item.name}</strong>
                    <small>{item.englishName}</small>
                </div>
            </div>
        );
    }

    render() {
        return (
            <Dropdown
              auto
              source={languages}
              label={this.props.strings.header}
              template={this.renderItem}
              value={this.props.currentLanguage}
              onChange={this.props.changeLanguage}
            />
        );
    }
}

LanguagePicker.propTypes = {
    strings: PropTypes.object,
    currentLanguage: PropTypes.string,
    changeLanguage: PropTypes.func
};

LanguagePicker.defaultProps = {
    currentLanguage: 'en',
    changeLanguage: noop,
    strings: {
        header: 'Choose a language'
    }
};

const decorators = flow([
    connect(stateToProps, actionsToProps),
    translate('LanguagePicker')
]);

export default decorators(LanguagePicker);
