import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { Avatar, Typography, Grid, Paper } from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
import BackupIcon from '@material-ui/icons/Backup';

import { config } from '../../configs';
import titles from '../../configs/titles';
import LoadingBar from '../../components/loading-bar';
import {
  getHomePageData,
  updateHomePageData
} from '../../redux/home/home.actions';
import { useStyles } from './home-page.styles';

const { homePageEdit } = titles;
const { IMG_URL } = config;

const HomePage = () => {
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

  const updateHomePageLooksHandler = ({ id, upload }) =>
    dispatch(updateHomePageData({ id, upload }));

  const photoUpdateHandler = ({ target }, id) => {
    if (target.files && target.files[0]) {
      const uploadedImage = {
        id,
        upload: target.files[0],
        preview: URL.createObjectURL(target.files[0])
      };

      setImageUrl((prev) => {
        if (Object.keys(prev).find((el) => el === target.name)) {
          return { ...prev, [target.name]: { ...uploadedImage } };
        }
        return {
          ...prev,
          [target.name]: uploadedImage
        };
      });

      updateHomePageLooksHandler(uploadedImage);
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
          <label className={classes.uploadContainer}>
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
              <ImageIcon className={classes.avatarBright} />
            </Avatar>
            <div className={classes.overlay}>
              <BackupIcon className={classes.uploadIcon} />
            </div>
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
        <Typography variant='h1' className={classes.title}>
          {homePageEdit.mainPageTitle}
        </Typography>
      </div>
      <div className={classes.tableContainer}>
        <Paper className={classes.paper}>
          <Grid container spacing={2}>
            {photosItems}
          </Grid>
        </Paper>
      </div>
    </div>
  );
};

export default HomePage;
