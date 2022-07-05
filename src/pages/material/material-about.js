import React, { useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { Button, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';

import { useStyles } from './material-page.styles';
import { useCommonStyles } from '../common.styles';
import buttonTitles from '../../configs/button-titles';
import { closeDialog } from '../../redux/dialog-window/dialog-window.actions';
import useSuccessSnackbar from '../../utils/use-success-snackbar';
import TableContainerRow from '../../containers/table-container-row';
import TableContainerGenerator from '../../containers/table-container-generator';
import { GET_MATERIALS_BLOCKS_BY_TYPE } from './operations/materials-page.queries';
import { DELETE_MATERIALS_BLOCK } from './operations/materials-page.mutations';
import { config } from '../../configs';
import LoadingBar from '../../components/loading-bar';

const tableTitles = config.tableHeadRowTitles.materialsAbout;
const { IMG_URL } = config;
const { pathToAboutMaterialsMainAdd, pathToAboutMaterialsBottomAdd } =
  config.routes;
const { CREATE_MATERIAL_TITLE_BLOCK } = buttonTitles;

const MaterialAbout = ({ currentType }) => {
  const styles = useStyles();
  const common = useCommonStyles();
  const dispatch = useDispatch();
  const { data, refetch, loading } = useQuery(GET_MATERIALS_BLOCKS_BY_TYPE, {
    variables: {
      type: currentType,
      skip: 0,
      limit: 0
    }
  });

  const [deleteMaterialsBlockByIDMutation] = useMutation(
    DELETE_MATERIALS_BLOCK
  );

  const materialsData = data?.getMaterialsBlocksByType || {};
  const runRefetchData = () => refetch();

  useEffect(runRefetchData, [data]);

  const { openSuccessSnackbar } = useSuccessSnackbar();

  const completeDeleteHandler = (materialID) => {
    deleteMaterialsBlockByIDMutation({
      variables: {
        id: materialID
      }
    }).then(runRefetchData);
    dispatch(closeDialog());
  };

  const openDeleteModalHandler = (materialID) =>
    openSuccessSnackbar(() => completeDeleteHandler(materialID));

  const aboutMaterialItems = materialsData.items
    ? materialsData.items.map(({ _id, title, text, image }) => (
        <TableContainerRow
          image={`${IMG_URL}${image.small}`}
          key={_id}
          title={title}
          text={ReactHtmlParser(text[0].value)}
          deleteHandler={() => openDeleteModalHandler(_id)}
          editHandler={() => null}
        />
      ))
    : null;

  const pathToAboutMaterialsAdd =
    currentType === 'main'
      ? pathToAboutMaterialsMainAdd
      : pathToAboutMaterialsBottomAdd;

  if (loading) {
    return <LoadingBar />;
  }

  return (
    <div className={common.container}>
      <div className={styles.header}>
        <Typography
          variant='h1'
          className={styles.materialTitle}
          data-cy='mainHeader'
        >
          {config.titles.materialTitles.mainPageTitle}
        </Typography>
        <Button
          data-test-id='createMaterialButton'
          id='addMaterials'
          component={Link}
          variant='contained'
          color='primary'
          to={pathToAboutMaterialsAdd}
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

MaterialAbout.propTypes = {
  currentType: PropTypes.string
};

MaterialAbout.defaultProps = {
  currentType: ''
};

export default MaterialAbout;
