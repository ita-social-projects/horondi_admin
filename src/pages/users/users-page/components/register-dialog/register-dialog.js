import React from 'react';
import PropTypes from 'prop-types';
import FormDialog from '../../../../../containers/form-dialog';
import RegisterUser from '../../../register-user';

const RegisterDialog = (props) => {
  const { handleClose } = props;
  return (
    <FormDialog {...props}>
      <RegisterUser handleClose={handleClose} />
    </FormDialog>
  );
};

RegisterDialog.propTypes = {
  handleClose: PropTypes.func.isRequired
};

export default RegisterDialog;
