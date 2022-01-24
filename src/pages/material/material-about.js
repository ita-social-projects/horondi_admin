import React, { useEffect } from 'react';
import { Button, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useStyles } from './material-page.styles';
import { useCommonStyles } from '../common.styles';
import buttonTitles from '../../configs/button-titles';
import TableContainerRow from '../../containers/table-container-row';
import TableContainerGenerator from '../../containers/table-container-generator';
import LoadingBar from '../../components/loading-bar';
import { config } from '../../configs';
import { GET_ALL_MATERIALS_BLOCKS } from './operations/material-about.queries';

const tableTitles = config.tableHeadRowTitles.materialsAbout;

const { pathToAddAboutMaterial } = config.routes;
const { CREATE_MATERIAL_TITLE_BLOCK } = buttonTitles;

const MaterialAbout = () => {
  const styles = useStyles();

  const common = useCommonStyles();

  const { data, refetch, loading } = useQuery(GET_ALL_MATERIALS_BLOCKS);
  const aboutMaterialData = data?.getAllMaterialsBlocks || {};
  const runRefetchData = () => refetch();
  useEffect(runRefetchData, [data]);
  if (loading) {
    return <LoadingBar />;
  }

  const aboutMaterialItems = aboutMaterialData
    ? aboutMaterialData.map(({ id, title, image }) => (
        <TableContainerRow
          showAvatar={false}
          key={id}
          title={title}
          text={id}
          image-text={image}
          deleteHandler={() => true}
          editHandler={() => true}
        />
      ))
    : null;

  return (
    <div className={common.container}>
      <div className={styles.header}>
        <Typography
          variant='h1'
          className={styles.materialTitle}
          data-cy='main-header'
        >
          {config.titles.materialTitles.mainPageTitle}
        </Typography>
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
      <TableContainerGenerator
        id='AboutMaterialsTable'
        tableTitles={tableTitles}
        tableItems={aboutMaterialItems}
      />
    </div>
  );
};

export default MaterialAbout;
