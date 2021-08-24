import React from 'react';
import { Button, Paper } from '@material-ui/core';
import PropTypes from 'prop-types';

import { useStyles } from './clear.styles';
import { config } from '../../../configs';

const { CLEAR_FILTERS } = config.buttonTitles;

const Clear = ({ handler }) => {
  const styles = useStyles();

  return (
    <Paper className={styles.container}>
      <Button onClick={handler}>{CLEAR_FILTERS}</Button>
    </Paper>
  );
};

Clear.propTypes = {
  handler: PropTypes.func.isRequired
};

export default Clear;
