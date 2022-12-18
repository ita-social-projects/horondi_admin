import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
import { Grid, useTheme } from '@material-ui/core';
import { CloudUploadRounded } from '@material-ui/icons';
import { useStyles } from './images-upload-container.styles';
import { showErrorSnackbar } from '../../redux/snackbar/snackbar.actions';

const ImagesUploadContainer = ({ handler, multiple, maxFiles, length }) => {
  const style = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  const availableCount = length ? maxFiles - length : maxFiles;

  const validate = (file) => {
    if (file.size > 15000000)
      return {
        code: 'size-too-large',
        message: 'Максимальний розмір фото 15Mb'
      };
    if (length >= maxFiles)
      return {
        code: 'max files',
        message: `Завантажте до ${maxFiles} фотографій`
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
    onDrop: (acceptedFiles, fileRejections) => {
      const files = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file)
        })
      );
      handler(files);

      if (fileRejections.length) {
        const { message } = fileRejections[0].errors[0];
        dispatch(showErrorSnackbar(message));
      }
    }
  };

  const { getRootProps, getInputProps, open } = useDropzone(options);

  return (
    <Grid container>
      <div {...getRootProps({ className: style.dropzone })}>
        <input {...getInputProps()} />
        <span>
          <CloudUploadRounded htmlColor={theme.palette.textColor} />
        </span>
        <p className={style.dropTitle}>Перетягніть фото сюди або</p>
        <button type='button' className={style.dropButton} onClick={open}>
          Обрати
        </button>
      </div>
      <p className={style.description}>
        Завантажте до {maxFiles} зображень. Максимальний розмір фото - 15MB.
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
