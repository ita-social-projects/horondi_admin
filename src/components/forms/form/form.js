import React, { Children, cloneElement } from 'react';

import PropTypes from 'prop-types';
import { noop } from 'lodash';

import { useFormik } from 'formik';

import { useUnsavedChangesHandler } from '../../../hooks/form-dialog/use-unsaved-changes-handler';

const wrapInput = (props) => (input) => cloneElement(input, props);
const eventPreventHandler = (e) => e.preventDefault();

export const Form = ({
  children,
  validationSchema,
  initialValues,
  handleSubmit,
  ...props
}) => {
  const formik = useFormik({
    validationSchema,
    initialValues,
    onSubmit: (values) => {
      handleSubmit(values);
    }
  });

  const unblockFunction = useUnsavedChangesHandler(formik.values);

  return (
    <form onSubmit={eventPreventHandler} {...props}>
      {Children.map(children, wrapInput({ unblockFunction, ...formik }))}
    </form>
  );
};

Form.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  validationSchema: PropTypes.func,
  initialValues: PropTypes.objectOf(PropTypes.object),
  handleSubmit: PropTypes.objectOf(PropTypes.object),
  onValuesChange: PropTypes.func
};

Form.defaultProps = {
  validationSchema: noop,
  initialValues: {},
  handleSubmit: noop,
  onValuesChange: noop
};

export default Form;
