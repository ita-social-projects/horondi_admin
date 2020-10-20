import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { Avatar, Button, Typography, Grid, Paper } from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';

import { config } from '../../configs';
import titles from '../../configs/titles';
import LoadingBar from '../../components/loading-bar';
import TableContainerGenerator from '../../containers/table-container-generator';
import TableContainerRow from '../../containers/table-container-row';
import useSuccessSnackbar from '../../utils/use-success-snackbar';
import {
  getHomePageData,
  updateHomePageData
} from '../../redux/home/home.actions';
import { useStyles } from './home-page.styles';

const { homePageEdit } = titles;
// const tableTitles = config.tableHeadRowTitles.homePageEdit;
const { IMG_URL } = config;
const { SAVE_TITLE } = config.buttonTitles;

const HomePageEdit = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { loading, photos } = useSelector(({ HomePage }) => ({
    loading: HomePage.homePageLoading,
    photos: HomePage.photos
  }));

  const [image, setImageUrl] = useState({});

  useEffect(() => {
    dispatch(getHomePageData());
  }, [dispatch]);

  const photoUpdateHandler = ({ target }, id) => {
    if (target.files && target.files[0]) {
      setImageUrl((prev) => {
        const uploadedImage = {
          id,
          file: target.files[0],
          preview: URL.createObjectURL(target.files[0])
        };

        if (!!Object.keys(prev).find((el) => el === target.name)) {
          return { ...prev,  [target.name]: { ...uploadedImage }};
        } else
          return {
            ...prev,
            [target.name]: uploadedImage
          };
      });
    }
  };

  const validateChanges = () => {
    return true;
  };

  const updateHomePageLooksHandler = () => {
    if (image) {
      let uploadIds = [];
      let upload = [];

      for (const key in image) {
        uploadIds.push(image[key].id);
        upload.push(image[key].file);
      }

      if (validateChanges()) {
        dispatch(updateHomePageData({ uploadIds, upload }));
      }
    }
  };

  const photosItems =
    photos && photos.length
      ? photos.map((photo) => (
          <Grid
            item
            xs={3}
            key={photo._id}
            container
            direction='row'
            justify='center'
            alignItems='center'
          >
            <label>
              <input
                style={{ display: 'none' }}
                accept='image/*'
                id='upload-photo'
                name={`upload-photo-${photo._id}`}
                type='file'
                onChange={(e) => photoUpdateHandler(e, photo._id)}
              />
              <Avatar
                variant='square'
                className={classes.avatar}
                src={
                  (image[`upload-photo-${photo._id}`] &&
                    image[`upload-photo-${photo._id}`].preview) ||
                  `${IMG_URL}${photo.images.small}`
                }
              >
                <ImageIcon className={classes.avatar} />
              </Avatar>
            </label>
          </Grid>
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
      </div>
      <div className={classes.tableContainer}>
        <Paper className={classes.paper}>
          <Grid container spacing={2}>
            {photosItems}
          </Grid>
        </Paper>
        <Button
          id='update-looksimages'
          onClick={updateHomePageLooksHandler}
          variant='contained'
          color='primary'
        >
          {SAVE_TITLE}
        </Button>
      </div>
    </div>
  );
};

export default HomePageEdit;
