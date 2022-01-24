import React from 'react';
import { Button, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useStyles } from './material-page.styles';
import { useCommonStyles } from '../common.styles';
import buttonTitles from '../../configs/button-titles';
import TableContainerRow from '../../containers/table-container-row';
import TableContainerGenerator from '../../containers/table-container-generator';
import { config } from '../../configs';

const tableTitles = config.tableHeadRowTitles.materialsAbout;

const { pathToAddAboutMaterial } = config.routes;
const { CREATE_MATERIAL_TITLE_BLOCK } = buttonTitles;

const MaterialAbout = () => {
  const styles = useStyles();
  const common = useCommonStyles();

  const materialsData = [
    { id: '1', name: 'Malmo', heading: 'Main Textile' },
    { id: '2', name: 'Bond', heading: 'Main Textile' },
    { id: '3', name: 'Textile', heading: 'Main Textile' },
    { id: '4', name: 'Woven', heading: 'Main Textile' },
    { id: '5', name: 'Knit', heading: 'Main Textile' }
  ];

  const aboutMaterialItems = materialsData.map(({ id, name, heading }) => (
    <TableContainerRow
      showAvatar={false}
      key={id}
      title={name}
      text={heading}
      deleteHandler={() => null}
      editHandler={() => null}
    />
  ));

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
