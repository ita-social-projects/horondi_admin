import React from 'react';
import { Typography, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

import { useCommonStyles } from '../common.styles';
import { config } from '../../configs';

const { materialUiConstants } = config;
const labels = config.labels.pocketsPageLabel;
const { CREATE_POCKETS_TITLE } = config.buttonTitles;
const {pathToPocketsAdd} = config.routes;

const PocketsPage = () => {
  const commonStyles = useCommonStyles();
  return (
    <div className={commonStyles.container}>
      <div className={`${commonStyles.adminHeader}`}>
        <Typography
          variant={materialUiConstants.typographyVariantH1}
          className={commonStyles.materialTitle}
          data-cy={labels.pocketsHeader}
        >
          {config.titles.pocketsTitles.mainPageTitle}
        </Typography>
        <Button
          id='addPockets'
          component={Link}
          variant={materialUiConstants.contained}
          color={materialUiConstants.primary}
          to={pathToPocketsAdd}
        >
          {CREATE_POCKETS_TITLE}
        </Button>
      </div>
    </div>
  );
};

export default PocketsPage;
