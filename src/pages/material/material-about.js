import React from 'react';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useCommonStyles } from '../common.styles';
import { config } from '../../configs';
import materialUiConstants from '../../configs/material-ui-constants';
import buttonTitles from '../../configs/button-titles';
import { getAllMaterialsBlocks } from './materials.queries';

const {pathToAddAboutMaterial} = config.routes;
const { CREATE_MATERIAL_TITLE_BLOCK } = buttonTitles;

const MaterialAbout = () => {
  const common = useCommonStyles();
  const { loading, error, data } = useQuery(getAllMaterialsBlocks);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className={common.container}>
      <Button
        id='add-materials'
        component={Link}
        to={pathToAddAboutMaterial}
        variant={materialUiConstants.outlined}
        color={materialUiConstants.primary}
      >
        {CREATE_MATERIAL_TITLE_BLOCK}
      </Button>

      {data.getAllMaterialsBlocks.map((item) => (
        <div key={item.id}>
          <h1>{item.heading}</h1>
          <p>{item.title}</p>
          <p>{item.text}</p>
        </div>
      ))}
    </div>
  );
};

export default MaterialAbout;
