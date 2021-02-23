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

import { selectPhotosAndLoading } from '../../redux/selectors/homepage.selectors';

import { useCommonStyles } from '../common.styles';

const { homePageTitles } = titles;
const { IMG_URL } = config;

const HomePage = () => {
  const styles = useStyles();
  const commonStyles = useCommonStyles();

  const dispatch = useDispatch();
  const { loading, photos } = useSelector(selectPhotosAndLoading);
  console.log(photos);

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
      ? photos.map((photo, i) => (
        <Grid
          item
          xs={3}
          key={photo._id}
          container
          direction='row'
          justify='center'
          alignItems='center'
          data-cy={`${photo._id}-${i}`}
        >
          <label className={styles.uploadContainer}>
            <input
              style={{ display: 'none' }}
              accept='image/*'
              id='upload-photo'
              name={`upload-photo-${photo._id}`}
              data-cy={`upload-photo-${i}`}
              type='file'
              onChange={(e) => photoUpdateHandler(e, photo._id)}
            />
            <Avatar
              variant='square'
              className={styles.avatar}
              data-cy={`photo-${i}`}
              src={
                (image[`upload-photo-${photo._id}`] &&
                    image[`upload-photo-${photo._id}`].preview) ||
                  `${IMG_URL}${photo.images.small}`
              }
            >
              <ImageIcon />
            </Avatar>
            <div className={styles.overlay}>
              <BackupIcon className={styles.uploadIcon} />
            </div>
          </label>
        </Grid>
      ))
      : null;

  if (loading) {
    return <LoadingBar />;
  }

  return (
    <div className={commonStyles.container}>
      <div className={commonStyles.adminHeader}>
        <Typography
          variant='h1'
          className={commonStyles.materialTitle}
          data-cy='homepage-title'
        >
          {homePageTitles.mainPageTitle}
        </Typography>
      </div>
      <Paper className={styles.paper}>
        <Grid container spacing={2}>
          {photosItems}
        </Grid>
      </Paper>
    </div>
  );
};

export default HomePage;
