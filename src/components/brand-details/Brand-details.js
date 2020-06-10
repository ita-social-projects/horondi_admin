import React, { useState, useEffect } from 'react';
import { Paper, TextField } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { useStyles } from './Brand-details-style';
import { SaveButton } from '../buttons';
import wrapWithAdminService from '../wrappers';

import {
  setSnackBarStatus,
  setSnackBarSeverity,
  setSnackBarMessage,
  setBrand
} from '../../actions';

const BrandDetails = (props) => {
  const classes = useStyles();
  const [brandName, setBrandName] = useState('');
  const {
    adminService,
    setSnackBarStatus,
    setSnackBarSeverity,
    setSnackBarMessage,
    setBrand,
    brand,
    match,
    history
  } = props;
  const { id } = match.params;
  const { brandsService } = adminService;

  useEffect(() => {
    brandsService.getBrandById(id).then((res) => {
      setBrand(res);
      setBrandName(res.brand);
    });
  }, [brandsService, id, setBrand]);

  const brandSaveHandler = async (e) => {
    e.preventDefault();
    const newBrand = { ...brand };
    newBrand.brand = brandName;

    await brandsService.putBrand(newBrand);

    setSnackBarSeverity('success');
    setSnackBarMessage(`Brand ${brandName} succesfully edited!`);
    setSnackBarStatus(true);
    history.push(`/brands`);
  };
  const chengeHandler = (e) => {
    setBrandName(e.target.value);
  };

  return (
    <form onSubmit={brandSaveHandler}>
      <Paper className={classes.brandEdit}>
        <TextField
          id='brandName'
          className={classes.textfield}
          variant='outlined'
          label='Brand name'
          value={brandName}
          onChange={chengeHandler}
          required
        />
        <SaveButton type='submit' title='Save' />
      </Paper>
    </form>
  );
};

const mapStateToProps = ({ brandsState: { brand } }) => ({
  brand
});
const mapDispatchToProps = {
  setSnackBarStatus,
  setSnackBarSeverity,
  setSnackBarMessage,
  setBrand
};

export default wrapWithAdminService()(
  connect(mapStateToProps, mapDispatchToProps)(withRouter(BrandDetails))
);
