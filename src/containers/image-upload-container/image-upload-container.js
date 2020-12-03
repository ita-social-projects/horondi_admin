import React from 'react';
import { Avatar, Button } from '@material-ui/core';
import { AttachFile, Image } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { useStyles } from './image-upload-container.styles';

const ImageUploadContainer = ({
  handler,
  srcForAvatar,
  fileName,
  multiple = false
}) => {
  const styles = useStyles();
  return (
    <div className={styles.imageUploadContainer}>
      <label htmlFor='upload-photo'>
        <input
          style={{ display: 'none' }}
          accept='image/*'
          id='upload-photo'
          name='upload-photo'
          type='file'
          onChange={handler}
          multiple={multiple}
        />
        <Button
          data-cy='add-photo'
          variant='outlined'
          color='primary'
          component='span'
        >
          <AttachFile className={styles.attachFile} />
          Завантажити
        </Button>
      </label>
      <Avatar
        data-cy='pattern-image'
        src={srcForAvatar}
        className={styles.large}
      >
        <Image />
      </Avatar>
      <span className={styles.imageName}>{fileName}</span>
    </div>
  );
};
ImageUploadContainer.propTypes = {
  handler: PropTypes.func.isRequired,
  fileName: PropTypes.string,
  srcForAvatar: PropTypes.oneOfType([PropTypes.string]).isRequired,
  multiple: PropTypes.bool
};
ImageUploadContainer.defaultProps = {
  multiple: false,
  fileName: ''
};
export default ImageUploadContainer;
