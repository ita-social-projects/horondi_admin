import React from 'react';
import PropTypes from 'prop-types';
import MaterialAboutAddForm from '../../components/forms/material-about-form';

const MaterialAboutAdd = ({ currentType }) => (
  <MaterialAboutAddForm currentType={currentType} />
);

MaterialAboutAdd.propTypes = {
  currentType: PropTypes.string.isRequired
};

export default MaterialAboutAdd;
