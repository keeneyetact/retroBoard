import PropTypes from 'prop-types';
import React from 'react';
import noop from 'lodash/noop';
import EnterInput from 'components/EnterInput';

const PostAdd = ({ onAdd, placeholder, icon }) => (
  <div>
    <EnterInput placeholder={placeholder} icon={icon} onEnter={onAdd} />
  </div>
);

PostAdd.propTypes = {
  onAdd: PropTypes.func,
  placeholder: PropTypes.string,
  icon: PropTypes.string,
};

PostAdd.defaultProps = {
  onAdd: noop,
  placeholder: 'New comment',
  icon: 'add_circle',
};

export default PostAdd;
