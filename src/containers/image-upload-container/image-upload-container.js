import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { AttachFile } from '@material-ui/icons';

const ImageUploadContainer = ({ handler, multiple, buttonLabel }) => (
  <div>
    <label htmlFor='upload-photo'>
      <Button variant='contained' color='primary' component='label'>
        <AttachFile />
        {buttonLabel}
        <input
          style={{ display: 'none' }}
          id='upload-photo'
          name='upload-photo'
          type='file'
          multiple
          onChange={handler}
        />
      </Button>
    </label>
  </div>
);

ImageUploadContainer.propTypes = {
  handler: PropTypes.func.isRequired,
  multiple: PropTypes.bool,
  buttonLabel: PropTypes.string
};

ImageUploadContainer.defaultProps = {
  multiple: false,
  buttonLabel: 'Завантажити'
};

export default ImageUploadContainer;
