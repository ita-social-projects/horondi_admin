import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import OptionPicker from '../../filters/option-picker';
import { sortDirection } from '../../../configs/sort';

const ComponentFilterSinglePicker = ({
  actionSetCurrentPage,
  actionSetSingleFilter,
  actionSetLabel,
  value,
  options,
  label
}) => {
  const dispatch = useDispatch();

  const setSortFilter = ({ key, type, value }) => {
    dispatch(actionSetCurrentPage(0));
    dispatch(
      actionSetSingleFilter({
        [key]: sortDirection[type]
      })
    );
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

ComponentFilterSinglePicker.propTypes = {
  actionSetCurrentPage: PropTypes.func.isRequired,
  actionSetSingleFilter: PropTypes.func.isRequired,
  actionSetLabel: PropTypes.func.isRequired,
  options: PropTypes.instanceOf(Array).isRequired,
  value: PropTypes.string,
  label: PropTypes.string
};

ComponentFilterSinglePicker.defaultProps = {
  value: '',
  label: ''
};

export default ComponentFilterSinglePicker;
