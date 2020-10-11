import React from 'react';
import { User } from 'retro-board-common';
import { Avatar, AvatarTypeMap } from '@material-ui/core';
import md5 from 'md5';
import { DefaultComponentProps } from '@material-ui/core/OverridableComponent';

interface AvatarProps extends DefaultComponentProps<AvatarTypeMap<{}, 'div'>> {
  user: User | null;
}

const getGravatar = (user: User | null) => {
  if (user && user.photo) {
    return user.photo;
  } else if (user) {
    return `https://www.gravatar.com/avatar/${md5(user.id)}?d=retro`;
  }
};

const CustomAvatar = ({ user, ...props }: AvatarProps) => {
  const displayName = user ? user.name : 'Not logged in';
  return (
    <Avatar
      {...props}
      alt={displayName}
      src={getGravatar(user)}
      title={displayName}
    />
  );
};

export default CustomAvatar;
