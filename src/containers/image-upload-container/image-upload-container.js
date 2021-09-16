import React from 'react';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
import { Grid } from '@material-ui/core';
import { useStyles } from './image-upload-previewContainer.styles';
import { utils } from '../../utils/image-upload';

const ImageUploadContainer = ({ handler, src, id, multiple, maxFiles }) => {
  const style = useStyles();
  const onDrop = {
    accept: 'image/*',
    multiple,
    maxFiles,
    onDrop: (acceptedFiles) => {
      const files = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file)
        })
      );
      handler(files);
    }
  };

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone(onDrop);
  // console.log(`acceptedFiles`, acceptedFiles)

  const thumbs = Array.isArray(src)
    ? acceptedFiles.map((file) => (
        <li className={style.thumb} key={file.name}>
          <div className={style.thumbInner}>
            <img
              src={file.preview}
              className={style.img}
              alt={utils.alt.preview}
            />
          </div>
        </li>
      ))
    : null;

  return (
    <>
      <Grid item {...getRootProps({ className: 'dropzone' })}>
        <input style={{ height: '100%', width: 'auto' }} {...getInputProps()} />
        <label
          className={src ? style.labelWithoutBack : style.labelWithBack}
          htmlFor={id}
          data-cy={utils.dataCy.preview}
        >
          {src && (
            <img className={style.image} src={src} alt={utils.alt.preview} />
          )}
        </label>
      </Grid>
      <div>
        <div className={style.thumbsContainer}>
          {multiple && <ul>{thumbs}</ul>}
        </div>
      </div>
    </>
  );
};

ImageUploadContainer.propTypes = {
  handler: PropTypes.func.isRequired,
  multiple: PropTypes.bool,
  maxFiles: PropTypes.number,
  src: PropTypes.string,
  id: PropTypes.string.isRequired
};

ImageUploadContainer.defaultProps = {
  multiple: false,
  src: null,
  maxFiles: 1
};

export default ImageUploadContainer;
