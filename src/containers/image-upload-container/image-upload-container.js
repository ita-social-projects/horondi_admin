import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { AttachFile } from '@material-ui/icons';
import { useStyles } from './image-upload-container.styles';

const ImageUploadContainer = ({ handler, multiple, buttonLabel }) => {
  const styles = useStyles();
  return (
    <div className={styles.imageUploadContainer}>
      <label htmlFor='upload-photo'>
        <Button variant='contained' color='primary' component='label'>
          <AttachFile className={styles.attachFile} />
          {buttonLabel}
          <input
            style={{ display: 'none' }}
            id='upload-photo'
            name='upload-photo'
            type='file'
            onChange={handler}
          />
        </Button>
      </label>
    </div>
  );
};

ImageUploadContainer.propTypes = {
  handler: PropTypes.func.isRequired,
  multiple: PropTypes.bool,
  buttonLabel: PropTypes.string
};

ImageUploadContainer.defaultProps = {
  multiple: false,
  buttonLabel: 'Upload File'
};

export default ImageUploadContainer;
