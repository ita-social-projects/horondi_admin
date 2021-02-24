import React from 'react';
import PropTypes from 'prop-types';
import upload from '../../assets/images/upload.png';
import { useStyles } from './image-upload-patternContainer.styles';
import { utils } from '../../utils/image-upload';

const ImageUploadPatternContainer = ({ handler, multiple, src, id }) => {
  const style = useStyles();

  return (
    <div>
      <label htmlFor={id} data-cy={utils.dataCy.pattern}>
        <img
          className={style.image}
          src={src || upload}
          alt={utils.alt.pattern}
        />
        <input
          className={style.input}
          id={id}
          name={utils.name}
          type='file'
          multiple
          onChange={handler}
        />
      </label>
    </div>
  );
};

ImageUploadPatternContainer.propTypes = {
  handler: PropTypes.func.isRequired,
  multiple: PropTypes.bool,
  src: PropTypes.string,
  id: PropTypes.string.isRequired
};

ImageUploadPatternContainer.defaultProps = {
  multiple: false,
  src: upload
};

export default ImageUploadPatternContainer;
