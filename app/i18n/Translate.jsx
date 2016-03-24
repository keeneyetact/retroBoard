import { default as React } from 'react';
import en from './en';
import fr from './fr';
import hu from './fr';

const languages = { en, fr, hu };

export default function translate(key) {
    return Component => {
        class TranslationComponent extends React.Component {

            render() {
                //console.log(key, ': current language: ', this.context.currentLanguage);
                var strings = languages[this.context.currentLanguage][key];
                if (strings) {
                    return <Component {...this.props} strings={strings} currentLanguage={this.context.currentLanguage} />;
                } else {
                    return <Component {...this.props} currentLanguage={this.context.currentLanguage} />;
                }

            }
        }

        TranslationComponent.contextTypes = {
            currentLanguage: React.PropTypes.string
        };

        return TranslationComponent;
    };
}
