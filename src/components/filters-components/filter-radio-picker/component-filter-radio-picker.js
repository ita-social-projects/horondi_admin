import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import OptionPicker from '../../filters/option-picker';

const ComponentFilterRadioPicker = ({
  actionSetCurrentPage,
  actionSetSingleFilter,
  actionSetLabel,
  value,
  options,
  label,
  selectorFunc
}) => {
  const dispatch = useDispatch();

  const setSortFilter = ({ key, type, value }) => {
    dispatch(actionSetCurrentPage(0));
    dispatch(actionSetSingleFilter(selectorFunc(value)));
    dispatch(actionSetLabel(value));
  };

  return (
    <OptionPicker
      handler={setSortFilter}
      value={value}
      options={options}
      label={label}
    />
  );
};

ComponentFilterRadioPicker.propTypes = {
  actionSetCurrentPage: PropTypes.func.isRequired,
  actionSetSingleFilter: PropTypes.func.isRequired,
  actionSetLabel: PropTypes.func.isRequired,
  options: PropTypes.instanceOf(Array).isRequired,
  selectorFunc: PropTypes.func.isRequired,
  value: PropTypes.string,
  label: PropTypes.string
};

ComponentFilterRadioPicker.defaultProps = {
  value: '',
  label: ''
};

export default ComponentFilterRadioPicker;
