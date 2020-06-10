import React, { useState } from 'react';
import { FormControl, Paper, TextField } from '@material-ui/core';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useStyles } from './Brand-add-page-style';
import { SaveButton } from '../buttons';
import wrapWithAdminService from '../wrappers';

import {
  setSnackBarStatus,
  setSnackBarSeverity,
  setSnackBarMessage
} from '../../actions';

const BrandAddPage = (props) => {
  const classes = useStyles();

  const {
    adminService,
    history,
    setSnackBarStatus,
    setSnackBarSeverity,
    setSnackBarMessage
  } = props;

  const { brandsService } = adminService;

  const [brandName, setBrandName] = useState('');

  const brandSaveHandler = async (e) => {
    e.preventDefault();
    const newBrand = {
      brand: e.target.brandName.value
    };

    const res = await brandsService.postBrand(newBrand);
    setSnackBarSeverity('success');
    setSnackBarMessage(`Brand ${res.brand} succesfully saved!`);
    setSnackBarStatus(true);
    setBrandName('');
    history.push(`/brands`);
  };

  const brandNameHandler = (e) => {
    setBrandName(e.target.value);
  };

  return (
    <form onSubmit={brandSaveHandler}>
      <FormControl>
        <Paper className={classes.brandAdd}>
          <TextField
            id='brandName'
            className={classes.textfield}
            variant='outlined'
            label='Brand name'
            value={brandName}
            onChange={brandNameHandler}
            required
          />
          <SaveButton id='save' type='submit' title='Save' />
        </Paper>
      </FormControl>
    </form>
  );
};

const mapDispatchToProps = {
  setSnackBarStatus,
  setSnackBarSeverity,
  setSnackBarMessage
};

export default wrapWithAdminService()(
  connect(null, mapDispatchToProps)(withRouter(BrandAddPage))
);
