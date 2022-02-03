import React from 'react';
import { Button, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useStyles } from './about-us.styles';
import materialUiConstants from '../../configs/material-ui-constants';
import { config } from '../../configs';
import TableContainerRow from '../../containers/table-container-row';
import TableContainerGenerator from '../../containers/table-container-generator';
import { tableFooter, tableHeader, tableItems } from './operations/mockdata';

const {aboutUsHeaderTitles} = config.tableHeadRowTitles;
const {aboutUsTitles} = config.tableHeadRowTitles;
const {aboutUsFooterTitles} = config.tableHeadRowTitles;
const { ADD_ABOUT_US } = config.buttonTitles;
const { pathToAboutUsAdd } = config.routes;

const AboutUs = () => {
  const styles = useStyles();
  const aboutUsHeaderItem = tableHeader.map(({ id, text }) => (
    <TableContainerRow
      showAvatar={false}
      key={id}
      title={text}
      deleteHandler={() => null}
      editHandler={() => null}
    />
  ));
  const aboutUsItems = tableItems.map(({ id, title, text, image }) => (
    <TableContainerRow
      showAvatar={false}
      key={id}
      title={title}
      text={`${text.slice(0, 300)} ...`}
      imageVal={image}
      deleteHandler={() => null}
      editHandler={() => null}
    />
  ));
  const aboutUsFooterItem = tableFooter.map(({ id, image }) => (
    <TableContainerRow
      showAvatar={false}
      key={id}
      imageVal={image}
      deleteHandler={() => null}
      editHandler={() => null}
    />
  ));
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
      <TableContainerGenerator
        className={styles.header}
        id='AboutUsHeaderTable'
        tableTitles={aboutUsHeaderTitles}
        tableItems={aboutUsHeaderItem}
      />
      <TableContainerGenerator
        className={styles.items}
        id='AboutUsTable'
        tableTitles={aboutUsTitles}
        tableItems={aboutUsItems}
      />
      <TableContainerGenerator
        className={styles.footer}
        id='AboutUsFooterTable'
        tableTitles={aboutUsFooterTitles}
        tableItems={aboutUsFooterItem}
      />
    </div>
  );
};

export default AboutUs;
