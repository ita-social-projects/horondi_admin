import React from 'react';
import { Button, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useStyles } from './about-us.styles';
import materialUiConstants from '../../configs/material-ui-constants';
import { config } from '../../configs';

const { ADD_ABOUT_US } = config.buttonTitles;
const { pathToAboutUsAdd } = config.routes;

const AboutUs = () => {
  const styles = useStyles();
  return (
    <div className={styles.container}>
      <div className={styles.adminHeader}>
        {' '}
        <Typography
          variant={materialUiConstants.typographyVariantH1}
          className={styles.materialTitle}
        >
          {config.titles.aboutUsTitles.mainTitle}
        </Typography>
        <Button
          id='about-us-add'
          component={Link}
          to={pathToAboutUsAdd}
          variant={materialUiConstants.outlined}
          color={materialUiConstants.primary}
        >
          {ADD_ABOUT_US}
        </Button>
      </div>
    </div>
  );
};

export default AboutUs;
