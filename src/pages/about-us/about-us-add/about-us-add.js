import React from 'react';
import { Button, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useStyles } from './about-us-add.styles';
import materialUiConstants from '../../../configs/material-ui-constants';
import { config } from '../../../configs';

const { GO_BACK_TITLE } = config.buttonTitles;
const { pathToAboutUs } = config.routes;

const AboutUsAdd = () => {
  const styles = useStyles();
  return (
    <div className={styles.container}>
      <div className={styles.adminHeader}>
        <Typography
          variant={materialUiConstants.typographyVariantH1}
          className={styles.materialTitle}
        >
          {config.titles.aboutUsTitles.mainTitleAdd}
        </Typography>
        <Button
          id='about-us'
          component={Link}
          to={pathToAboutUs}
          variant={materialUiConstants.outlined}
          color={materialUiConstants.primary}
        >
          {GO_BACK_TITLE}
        </Button>
      </div>
      <div className={styles.content} />
    </div>
  );
};

export default AboutUsAdd;
