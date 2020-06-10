import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import wrapWithAdminService from '../wrappers';

import {
  setBrands,
  brandLoadingStatus,
  setSnackBarStatus,
  setSnackBarSeverity,
  setSnackBarMessage,
  setDialogStatus,
  setDialogTitle,
  setDialogContent,
  setButtonTitle,
  setEventHandler
} from '../../actions';

import useStyle from './Brand-list-style';
import LoadingBar from '../loading-bar';
import TableContainerRow from '../table-container-row';
import TableContainerGenerator from '../table-container-generator/Table-container-generator';

import { config } from '../../config';

const tableTitles = config.tableHeadRowTitles.brands;

const REMOVE_TITLE = 'Remove brand';
const REMOVE_MESSAGE = 'Are you sure you want to remove brand?';
const SUCCESS_STATUS = 'success';

const BrandList = ({
  adminService,
  brands,
  setBrands,
  brandLoadingStatus,
  loading,
  history,
  setSnackBarStatus,
  setSnackBarSeverity,
  setSnackBarMessage,
  setDialogStatus,
  setDialogTitle,
  setDialogContent,
  setButtonTitle,
  setEventHandler
}) => {
  const { brandsService } = adminService;

  const pathToAddBrandPage = '/brandadd';

  const classes = useStyle();

  useEffect(() => {
    brandLoadingStatus();
    brandsService.getAllBrands().then((res) => setBrands(res));
  }, [brandsService, setBrands, brandLoadingStatus]);

  const openSuccessSnackbar = (eventHandler) => {
    setDialogTitle(REMOVE_TITLE);
    setDialogContent(REMOVE_MESSAGE);
    setButtonTitle(REMOVE_TITLE);
    setEventHandler(eventHandler);
    setDialogStatus(true);
  };

  const brandDeleteHandler = (id) => async () => {
    const removeBrand = async () => {
      const res = await brandsService.deleteBrand(id);
      setDialogStatus(false);
      setSnackBarMessage(res);
      setSnackBarSeverity(SUCCESS_STATUS);
      setSnackBarStatus(true);
      brandLoadingStatus();
      const newBrands = await brandsService.getAllBrands();
      setBrands(newBrands);
    };
    openSuccessSnackbar(removeBrand);
  };

  const brandItems = brands.map((brand, index) => (
    <TableContainerRow
      key={index}
      id={brand._id}
      brand={brand.brand}
      editHandler={() => {
        history.push(`/brand/${brand._id}`);
      }}
      deleteHandler={brandDeleteHandler(brand._id)}
    />
  ));

  if (loading) {
    return <LoadingBar />;
  }
  return (
    <div>
      <div className={classes.tableNav}>
        <Button
          id='add-brand'
          component={Link}
          to={pathToAddBrandPage}
          variant='contained'
          color='primary'
        >
          New Brand
        </Button>
      </div>
      <TableContainerGenerator
        id='brandsTable'
        tableTitles={tableTitles}
        tableItems={brandItems}
      />
    </div>
  );
};

const mapStateToProps = ({ brandsState: { brands, loading } }) => ({
  brands,
  loading
});

const mapDispatchToProps = {
  setBrands,
  brandLoadingStatus,
  setSnackBarStatus,
  setSnackBarSeverity,
  setSnackBarMessage,
  setDialogStatus,
  setDialogTitle,
  setDialogContent,
  setButtonTitle,
  setEventHandler
};

export default wrapWithAdminService()(
  connect(mapStateToProps, mapDispatchToProps)(withRouter(BrandList))
);
