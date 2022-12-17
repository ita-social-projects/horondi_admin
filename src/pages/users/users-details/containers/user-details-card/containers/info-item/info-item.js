import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useStyles } from './info-item.styles';

const InfoItem = ({ label, id, data }) => {
  const styles = useStyles();

  return (
    <Grid item key={id}>
      <Grid container spacing={1} className={styles.container}>
        <div>
          <Typography className={styles.detailTitle} variant='h6'>
            {label}:
          </Typography>
        </div>
        <div>
          <Typography
            className={
              data?.length ? styles.detailSubtitle : styles.defaultText
            }
            data-cy={id}
            variant='h6'
          >
            {data?.length ? data : 'Порожньо'}
          </Typography>
        </div>
      </Grid>
    </Grid>
  );
};

InfoItem.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  data: PropTypes.string
};

export default InfoItem;
