import React from 'react';
import PropTypes from 'prop-types';
import { useStyles } from './image-upload-previewContainer.styles';
import { utils } from '../../utils/image-upload';

const ImageUploadContainer = ({ handler, multiple, src, id }) => {
  const style = useStyles();

  return (
    <div>
      <label
        className={src ? style.labelWithoutBack : style.labelWithBack}
        htmlFor={id}
        data-cy={utils.dataCy.pattern}
      >
        {src && (
          <img className={style.image} src={src} alt={utils.alt.pattern} />
        )}
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

ImageUploadContainer.propTypes = {
  handler: PropTypes.func.isRequired,
  multiple: PropTypes.bool,
  src: PropTypes.string,
  id: PropTypes.string.isRequired
};

ImageUploadContainer.defaultProps = {
  multiple: false,
  src: null
};

export default ImageUploadContainer;
