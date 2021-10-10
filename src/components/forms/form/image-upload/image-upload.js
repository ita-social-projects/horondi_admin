import React from 'react';

import PropTypes from 'prop-types';
import { noop } from 'lodash';

import ImageUploadContainer from '../../../../containers/image-upload-container';
import useBasicsHandlers from '../../../../utils/use-basics-handlers';

import { useStyles } from './image-upload.styles';

export const ImageUpload = ({
  errors,
  values,
  touched,
  label,
  name,
  setFieldValue,
  ...props
}) => {
  const styles = useStyles();
  const { setUpload, setBasicImage } = useBasicsHandlers();

  const handleImageLoad = (files) => {
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFieldValue(name, event.target.result);
        setBasicImage(event.target.result);
      };
      reader.readAsDataURL(files[0]);
      setUpload(files[0]);
    }
  };

  return (
    <div className={styles.imageUploadBlock}>
      <div>
        <span className={styles.imageUpload}>{label}</span>
        <div className={styles.imageUploadAvatar}>
          <ImageUploadContainer
            handler={handleImageLoad}
            src={values[name]}
            id={name}
          />
        </div>
      </div>
    </div>
  );
};

ImageUpload.propTypes = {
  errors: PropTypes.objectOf(PropTypes.object),
  values: PropTypes.objectOf(PropTypes.object),
  touched: PropTypes.objectOf(PropTypes.object),
  label: PropTypes.string,
  name: PropTypes.string,
  setFieldValue: PropTypes.func
};

ImageUpload.defaultProps = {
  errors: {},
  touched: {},
  values: {},
  label: '',
  name: '',
  setFieldValue: noop
};

export default ImageUpload;
