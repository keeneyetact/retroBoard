import React, { Component } from 'react';
import styled from 'styled-components';
import { Edit } from '@material-ui/icons';
import TextareaAutosize from 'react-autosize-textarea';

interface EditableLabelProps extends CenteredProp {
  value: string;
  readOnly?: boolean;
  placeholder?: string;
  multiline?: boolean;
  label?: string;
  innerRef?: React.RefObject<HTMLTextAreaElement>;
  onChange: (value: string) => void;
}

interface CenteredProp {
  centered?: boolean;
}

interface EditableLabelState {
  editMode: boolean;
}

export default class EditableLabel extends Component<
  EditableLabelProps,
  EditableLabelState
> {
  inputRef: React.RefObject<HTMLElement>;
  constructor(props: EditableLabelProps) {
    super(props);
    this.state = { editMode: false };
    this.inputRef = React.createRef<HTMLElement>();
  }

  onKeyPress(e: KeyboardEvent) {
    if (e.keyCode === 13 && !e.shiftKey) {
      this.setState({ editMode: false });
    }
  }

  renderReadOnlyMode() {
    const { value, placeholder, label } = this.props;

    return <ViewMode aria-label={label}>{value || placeholder}</ViewMode>;
  }

  renderViewMode() {
    const { value, placeholder, readOnly, label } = this.props;

    if (readOnly) {
      return this.renderReadOnlyMode();
    }

    return (
      <ViewMode
        onClick={() =>
          this.setState({ editMode: true }, () =>
            this.inputRef.current!.focus()
          )
        }
      >
        <span aria-label={label}>{value || placeholder}</span>
        &nbsp;
        <EditIcon fontSize="inherit" />
      </ViewMode>
    );
  }

  renderEditMode() {
    const { value, onChange, label, multiline = false } = this.props;
    return (
      <EditMode>
        {multiline ? (
          <TextareaAutosize
            ref={this.inputRef as React.RefObject<HTMLTextAreaElement>}
            aria-label={`${label} input`}
            value={value}
            onBlur={() => {
              this.setState({ editMode: false });
            }}
            onKeyPress={e => this.onKeyPress(e.nativeEvent)}
            onChange={v => {
              onChange(v.currentTarget.value);
            }}
          />
        ) : (
          <input
            ref={this.inputRef as React.RefObject<HTMLInputElement>}
            aria-label={`${label} input`}
            value={value}
            onBlur={() => {
              this.setState({ editMode: false });
            }}
            onKeyPress={e => this.onKeyPress(e.nativeEvent)}
            onChange={v => {
              onChange(v.currentTarget.value);
            }}
          />
        )}
        <InvisibleEditIcon fontSize="inherit" />
      </EditMode>
    );
  }

  focus() {
    this.setState({ editMode: true }, () => {
      this.inputRef.current!.focus();
    });
  }

  render() {
    return (
      <LabelContainer>
        {this.state.editMode ? this.renderEditMode() : this.renderViewMode()}
      </LabelContainer>
    );
  }
}

const LabelContainer = styled.span``;

const ViewMode = styled.span`
  display: inline-block;
  > span {
    white-space: pre-wrap;
    line-height: 1.5;
  }
`;

const EditMode = styled.span<CenteredProp>`
  display: inline-flex;
  width: 100%;
  margin: 0 auto;
  padding: 0;

  textarea,
  input {
    flex: 1;
    font-family: inherit;
    font-weight: inherit;
    letter-spacing: inherit;
    width: 100%;
    background: none;
    border: none;
    outline: none;
    font-size: inherit;
    text-align: ${props => (props.centered ? 'center' : 'inherit')};
    padding: 0;
    line-height: 1.5;
  }
`;

const EditIcon = styled(Edit)`
  font-size: 0.01em;
  position: relative;
  top: 2px;
`;

const InvisibleEditIcon = styled(EditIcon)`
  opacity: 0;
  margin-left: 6px;
`;
