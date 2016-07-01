import React, { PropTypes } from 'react';
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
    onChangeLanguage: lang => dispatch(changeLanguage(lang))
});

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

const renderItem = item => (
    <div style={containerStyle}>
        <img src={flags[item.value]} style={imageStyle} alt="Flag" />
        <div style={contentStyle}>
            <strong>{item.name}</strong>
            <small>{item.englishName}</small>
        </div>
    </div>
);

const LanguagePicker = ({ strings, currentLanguage, onChangeLanguage }) => (
    <Dropdown
      auto
      source={languages}
      label={strings.header}
      template={renderItem}
      value={currentLanguage}
      onChange={onChangeLanguage}
    />
);

LanguagePicker.propTypes = {
    strings: PropTypes.object,
    currentLanguage: PropTypes.string,
    onChangeLanguage: PropTypes.func
};

LanguagePicker.defaultProps = {
    currentLanguage: 'en',
    onChangeLanguage: noop,
    strings: {
        header: 'Choose a language'
    }
};

const decorators = flow([
    connect(stateToProps, actionsToProps),
    translate('LanguagePicker')
]);

export default decorators(LanguagePicker);
