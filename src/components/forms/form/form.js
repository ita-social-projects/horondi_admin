import React from 'react';
import PropTypes from 'prop-types';

const eventPreventHandler = (e) => {
  e.preventDefault();
};

export const Form = ({ children }) => (
  <form onSubmit={eventPreventHandler}>{children}</form>
);

Form.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired
};

export default Form;
