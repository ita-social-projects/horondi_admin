import React from 'react';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
import { Grid } from '@material-ui/core';
import { CloudUploadRounded } from '@material-ui/icons';
import { useStyles } from './images-upload-container.styles';

const ImagesUploadContainer = ({ handler, multiple, maxFiles, length }) => {
  const style = useStyles();
  const availableCount = length ? maxFiles - length : maxFiles;

  const validate = (file) => {
    if (file.size > 10000000)
      return {
        code: 'size-too-large',
        massage: 'The Size of Image must be under 10Mb'
      };
    if (length > maxFiles)
      return {
        code: 'max files',
        massage: `The Size of Image must be ${maxFiles}`
      };
    return null;
  };

  const options = {
    accept: 'image/*',
    multiple,
    maxFiles: availableCount,
    noClick: true,
    noKeyboard: true,
    validator: validate,
    onDrop: (acceptedFiles) => {
      const files = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file)
        })
      );
      handler(files);
    }
  };

  const { getRootProps, getInputProps, open } = useDropzone(options);

  return (
    <Grid container>
      <div {...getRootProps({ className: style.dropzone })}>
        <input {...getInputProps()} />
        <span>
          <CloudUploadRounded />
        </span>
        <p>Перетягніть фото сюди або</p>
        <button type='button' className={style.dropButton} onClick={open}>
          Обрати
        </button>
      </div>
      <p className={style.description}>
        Завантажте до {maxFiles} зображень. Максимальний розмір фото - 10MB.
        Дозволені формати: jpeg, jpg, png.
      </p>
    </Grid>
  );
};

ImagesUploadContainer.propTypes = {
  handler: PropTypes.func.isRequired,
  multiple: PropTypes.bool,
  maxFiles: PropTypes.number,
  length: PropTypes.number
};

ImagesUploadContainer.defaultProps = {
  multiple: false,
  maxFiles: 1,
  length: 0
};

export default ImagesUploadContainer;
