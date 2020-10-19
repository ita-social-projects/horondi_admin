import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { useStyles } from './detail.styles';

const Detail = ({ title, text }) => {
  const styles = useStyles();

  return (
    <div>
      <Typography>
        <span className={styles.title}>{title}: </span>
        {text}
      </Typography>
    </div>
  );
};

Detail.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired
  ]).isRequired
};

export default Detail;
