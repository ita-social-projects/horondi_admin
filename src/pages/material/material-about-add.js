import React from 'react';
import { Link } from 'react-router-dom';
import { TextareaAutosize } from '@material-ui/core';
import { SaveButton, BackButton } from '../../components/buttons';
import materialUiConstants from '../../configs/material-ui-constants';
import { useCommonStyles } from '../common.styles';
import { config } from '../../configs';
import buttonTitles from '../../configs/button-titles';
import ImageUploadPreviewContainer from '../../containers/image-upload-container/image-upload-previewContainer';
import { useStyles } from '../../components/forms/news-form/news-form.styles';

const { MODEL_SAVE_TITLE } = buttonTitles;
const pathToAboutMaterial = config.routes.pathToAboutMaterials;

const MaterialAboutAdd = () => {
  const common = useCommonStyles();
  const styles = useStyles();

  return (
    <div className={common.container}>
      <div>
        <BackButton
          id='add-news'
          component={Link}
          to={pathToAboutMaterial}
          variant={materialUiConstants.outlined}
          color={materialUiConstants.primary}
        />
        <SaveButton
          style={{ marginLeft: '10px' }}
          type='button'
          title={MODEL_SAVE_TITLE}
          variant={materialUiConstants.outlined}
          color={materialUiConstants.primary}
        />
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          marginTop: '40px'
        }}
      >
        <div>
          <ImageUploadPreviewContainer id='material-add' handler={() => true} />
        </div>
        <div>
          <TextareaAutosize className={styles.textArea} />
        </div>
        <div>
          <TextareaAutosize className={styles.textArea} />
        </div>
      </div>
    </div>
  );
};

export default MaterialAboutAdd;
