import React, { PropTypes } from 'react';
import noop from 'lodash/noop';
import Component from '../Component';
import style from './EditableLabel.scss';
import FontIcon from 'react-toolbox/lib/font_icon';
import icons from '../constants/icons';

export default class EditableLabel extends Component {
    constructor(props) {
        super(props);
        this.state = { editMode: false };
    }

    onKeyPress(e) {
        if (e.keyCode === 13) {
            this.setState({ editMode: false });
            this.props.onChange.flush();
        }
    }

    renderViewMode() {
        const { value, placeholder } = this.props;

        return (
            <span
              className={style.view}
              onClick={() => this.setState({ editMode: true }, () => this.refs.input.focus())}
            >
                { value || placeholder }&nbsp;
                <FontIcon className={style.editIcon} value={icons.create} />
            </span>
        );
    }

    renderEditMode() {
        const { value, onChange } = this.props;
        return (
            <span className={style.edit}>
                <input
                  ref="input"
                  value={value}
                  onBlur={() => {
                      this.setState({ editMode: false });
                      onChange.flush();
                  }}
                  onKeyPress={e => this.onKeyPress(e.nativeEvent)}
                  onChange={v => {
                      onChange(v.target.value);
                  }}
                />
            </span>
        );
    }

    render() {
        return (
            <span className={style.editableLabel}>
                { this.state.editMode ? this.renderEditMode() : this.renderViewMode() }
            </span>
        );
    }
}

EditableLabel.propTypes = {
    value: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func
};

EditableLabel.defaultProps = {
    value: '',
    placeholder: 'nothing',
    onChange: noop
};
