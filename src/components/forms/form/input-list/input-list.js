import React from 'react';

import PropTypes from 'prop-types';
import { noop } from 'lodash';

import { Paper, Typography } from '@material-ui/core';

import { useStyles } from './input-list.styles';

export const InputListTitle = ({ title, ...props }) => (
  <Typography component='h1' variant='h5' {...props}>
    {title}
  </Typography>
);

const InputList = ({ title, children, ...props }) => {
  const styles = useStyles();

  return (
    <div>
      {title && <InputListTitle title={title} className={styles.title} />}
      <Paper className={styles.inputsContainer} {...props}>
        {children}
      </Paper>
    </div>
  );
};

InputListTitle.propTypes = {
  title: PropTypes.string
};

InputListTitle.defaultProps = {
  title: noop
};

InputList.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  title: PropTypes.string
};

InputList.defaultProps = {
  title: noop
};

export default InputList;
