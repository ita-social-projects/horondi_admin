import React from 'react';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useCommonStyles } from '../common.styles';
import { config } from '../../configs';
import buttonTitles from '../../configs/button-titles';

const { pathToAddAboutMaterial } = config.routes;
const { CREATE_MATERIAL_TITLE_BLOCK } = buttonTitles;

const MaterialAbout = () => {
  const common = useCommonStyles();

  return (
    <div className={common.container}>
      <Button
        data-testid='createMaterialButton'
        id='add-materials'
        component={Link}
        to={pathToAddAboutMaterial}
        variant='contained'
        color='primary'
      >
        {CREATE_MATERIAL_TITLE_BLOCK}
      </Button>
    </div>
  );
};

export default MaterialAbout;
