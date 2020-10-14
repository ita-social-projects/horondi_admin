import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { Button, Typography } from '@material-ui/core';

import { config } from '../../configs';
import titles from '../../configs/titles';
import LoadingBar from '../../components/loading-bar';
import TableContainerGenerator from '../../containers/table-container-generator';
import TableContainerRow from '../../containers/table-container-row';
import useSuccessSnackbar from '../../utils/use-success-snackbar';
import { getHomePageData } from '../../redux/home/home.actions';
import { useStyles } from './home-page.styles';

const { homePageEdit } = titles;
const tableTitles = config.tableHeadRowTitles.homePageEdit;

const HomePageEdit = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  // const { loading, photos } = useSelector(
  //   ({ HomePage: { loading, photos } }) => ({
  //     loading, photos
  //   })
  // );
  const loading = null;
  const photos = null;
  // useEffect(() => {
  //   dispatch(getHomePageData());
  // }, [dispatch]);

  const photoUpdateHandler = () => {};
  const photoDeleteHandler = () => {};

  const photosItems =
    photos && photos.length
      ? photos.map((photo, index) => (
        <TableContainerRow
          key={`${photo.id}-${index}`}
          id={photo.id}
          showAvatar
          editHandler={() => photoUpdateHandler(photo._id)}
          deleteHandler={() => photoDeleteHandler(photo._id)}
        />
      ))
      : null;

  if (loading) {
    return <LoadingBar />;
  }

  return (
    <div className={classes.container}>
      <div className={classes.tableNav}>
        <Typography variant='h1' className={classes.contactsTitle}>
          {homePageEdit.mainPageTitle}
        </Typography>
        {/* <Button
          id='add-contact'
          component={Link}
          to={pathToAddContactPage}
          variant='contained'
          color='primary'
        >
          {CREATE_CONTACT_TITLE}
        </Button> */}
      </div>
      <div className={classes.tableContainer}>
        <TableContainerGenerator
          id='contactTable'
          tableTitles={tableTitles}
          tableItems={photosItems}
        />
      </div>
    </div>
  );
};

export default HomePageEdit;
