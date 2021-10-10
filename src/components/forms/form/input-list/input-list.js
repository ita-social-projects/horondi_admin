import React, { Children, cloneElement } from 'react';

import PropTypes from 'prop-types';
import { noop } from 'lodash';

import { Paper, Typography } from '@material-ui/core';

import { useStyles } from './input-list.styles';

const wrapInput = (props) => (input) => cloneElement(input, props);

export const InputListTitle = ({ title, ...props }) => (
  <Typography component='h1' variant='h5' {...props}>
    {title}
  </Typography>
);

export const InputList = ({
  title,
  children,
  setFieldValue,
  handleChange,
  handleBlur,
  touched,
  errors,
  values,
  component,
  ...props
}) => {
  const styles = useStyles();

  const wrapProps = {
    setFieldValue,
    handleChange,
    handleBlur,
    touched,
    errors,
    values
  };

  const Container = component;

  return (
    <div>
      {title && <InputListTitle title={title} className={styles.title} />}
      <Container className={styles.inputsContainer} {...props}>
        {Children.map(children, wrapInput(wrapProps))}
      </Container>
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
  title: PropTypes.string,
  setFieldValue: PropTypes.func,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  touched: PropTypes.objectOf(PropTypes.object),
  errors: PropTypes.objectOf(PropTypes.object),
  values: PropTypes.objectOf(PropTypes.object),
  component: PropTypes.node
};

InputList.defaultProps = {
  title: noop,
  setFieldValue: noop,
  handleChange: noop,
  handleBlur: noop,
  touched: {},
  errors: {},
  values: {},
  component: Paper
};

export default InputList;
