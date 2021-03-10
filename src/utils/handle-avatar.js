import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { Image } from '@material-ui/icons';

export const handleAvatar = (image, dataCy, classes) => image ? (
  <Avatar data-cy={dataCy} src={image} className={classes}>
    <Image />
  </Avatar>
) : null;
