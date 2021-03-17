import React from 'react';
import PropTypes from 'prop-types';
import { AttachFile } from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import { useStyles } from './image-upload-patternContainer.styles';
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
//
// const ImageUploadContainer = ({ handler, multiple, buttonLabel }) => (
//   <div>
//     <label htmlFor='upload-photo' data-cy='pattern-image'>
//       <Button
//         variant='contained'
//         color='primary'
//         component='label'
//         data-cy='upload-photo'
//       >
//         <AttachFile />
//         {buttonLabel}
//         <input
//           style={{ display: 'none' }}
//           id='upload-photo'
//           name='upload-photo'
//           type='file'
//           multiple
//           onChange={handler}
//         />
//       </Button>
//     </label>
//   </div>
// );
//
// ImageUploadContainer.propTypes = {
//   handler: PropTypes.func.isRequired,
//   multiple: PropTypes.bool,
//   buttonLabel: PropTypes.string
// };
//
// ImageUploadContainer.defaultProps = {
//   multiple: false,
//   buttonLabel: 'Завантажити'
// };
//
// export default ImageUploadContainer;
