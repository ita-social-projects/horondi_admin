import React from 'react';
import PropTypes from 'prop-types';
import { useStyles } from './image-upload-previewContainer.styles';
import { utils } from '../../utils/image-upload';

const ImageUploadPreviewContainer = ({ handler, multiple, src, id }) => {
  const style = useStyles();

  return (
    <div>
      <label
        className={src ? style.labelWithoutBack : style.labelWithBack}
        htmlFor={id}
        data-cy={utils.dataCy.preview}
      >
        {src && (
          <img className={style.image} src={src} alt={utils.alt.preview} />
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

ImageUploadPreviewContainer.propTypes = {
  handler: PropTypes.func.isRequired,
  multiple: PropTypes.bool,
  src: PropTypes.string,
  id: PropTypes.string.isRequired
};

ImageUploadPreviewContainer.defaultProps = {
  multiple: false,
  src: null
};

export default ImageUploadPreviewContainer;
