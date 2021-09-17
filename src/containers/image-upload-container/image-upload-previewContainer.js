import React from 'react';
import { useDropzone } from 'react-dropzone';
import PropTypes from 'prop-types';
import { useStyles } from './image-upload-previewContainer.styles';
import { utils } from '../../utils/image-upload';

const ImageUploadPreviewContainer = ({ handler, src, id }) => {
  const style = useStyles();
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      handler(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      );
    }
  });

  return (
    <section className='container'>
      <div {...getRootProps({ className: 'dropzone' })}>
        <input
          style={{ height: '300px', width: '200px' }}
          {...getInputProps()}
        />
        <label
          className={src ? style.labelWithoutBack : style.labelWithBack}
          htmlFor={id}
          data-cy={utils.dataCy.preview}
        >
          {src && (
            <img className={style.image} src={src} alt={utils.alt.preview} />
          )}
        </label>
      </div>
    </section>
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
