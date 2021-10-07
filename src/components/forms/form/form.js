import React from 'react';
import PropTypes from 'prop-types';

const Form = ({ children }) => (
  <form>
    <h1>Hello world</h1>
    {children}
  </form>
);

Form.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired
};

export default Form;
