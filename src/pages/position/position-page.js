import React from 'react';
import { Typography, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

import { useCommonStyles } from '../common.styles';
import { config } from '../../configs';

const { materialUiConstants } = config;
const labels = config.labels.positionPageLabel;
const { CREATE_POSITION_TITLE } = config.buttonTitles;
const { pathToPositionAdd } = config.routes;
const { DELETE_POSITION_MESSAGE, NO_POSITION_MESSAGE } = config.messages;

const PositionPage = () => {
  const commonStyles = useCommonStyles();

  return (
    <div className={commonStyles.container}>
      <div className={`${commonStyles.adminHeader}`}>
        <Typography
          variant={materialUiConstants.typographyVariantH1}
          className={commonStyles.materialTitle}
          data-cy={labels.positionHeader}
        >
          {config.titles.positionTitles.mainPageTitle}
        </Typography>
        <Button
          id='addPockets'
          component={Link}
          variant={materialUiConstants.contained}
          color={materialUiConstants.primary}
          to={pathToPositionAdd}
        >
          {CREATE_POSITION_TITLE}
        </Button>
      </div>
      <p className={commonStyles.noRecords}>{NO_POSITION_MESSAGE}</p>
    </div>
  );
};

export default PositionPage;
