import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useStyles } from './info-item.styles';

const InfoItem = ({ label, id, data, key }) => {
  const styles = useStyles();

  return (
    <Grid item key={key}>
      <Grid container spacing={1} className={styles.container}>
        <div>
          <Typography className={styles.detailTitle} variant='h6'>
            {label}:
          </Typography>
        </div>
        <div>
          <Typography
            className={styles.detailSubtitle}
            data-cy={id}
            variant='h6'
          >
            {data}
          </Typography>
        </div>
      </Grid>
    </Grid>
  );
};

InfoItem.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  data: PropTypes.string.isRequired,
  key: PropTypes.string.isRequired
};

export default InfoItem;
