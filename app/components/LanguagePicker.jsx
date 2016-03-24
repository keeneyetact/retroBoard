import { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Dropdown from 'react-toolbox/lib/dropdown';
import { changeLanguage } from '../state/user';
import languages from '../i18n/languages';
import fr from './images/fr.png';
import en from './images/uk.png';
import hu from './images/hu.png';

const images = {
    fr, en, hu
};

class LanguagePicker extends Component {
    render() {
        return (
            <Dropdown
                auto
                source={languages}
                label="Choose a language"
                template={this.renderItem}
                value={this.props.currentLanguage}
                onChange={this.props.changeLanguage}
            />
        );
    }

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
               <img src={images[item.value]} style={imageStyle}/>
               <div style={contentStyle}>
                 <strong>{item.englishName}</strong>
                 <small>{item.name}</small>
               </div>
             </div>
           );
    }
}

const stateToProps = state => ({
    currentLanguage: state.user.lang
});

const actionsToProps = dispatch => ({
    changeLanguage: lang => dispatch(changeLanguage(lang))
});

export default connect(stateToProps, actionsToProps)(LanguagePicker);
