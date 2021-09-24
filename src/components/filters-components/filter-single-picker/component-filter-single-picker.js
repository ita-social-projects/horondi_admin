import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import OptionPicker from '../../filters/option-picker';
import { sortDirection } from '../../../configs/sort';
import { setCurrentPage } from '../../../redux/table/table.actions';

const ComponentFilterSinglePicker = ({
  setFilterValue,
  actionSetLabel,
  value: pickerValue,
  options,
  label
}) => {
  const dispatch = useDispatch();

  const setSortFilter = ({ key, type, value }) => {
    dispatch(setCurrentPage(0));
    dispatch(
      setFilterValue({
        [key]: sortDirection[type]
      })
    );
    dispatch(actionSetLabel(value));
  };

  return (
    <OptionPicker
      handler={setSortFilter}
      value={pickerValue}
      options={options}
      label={label}
    />
  );
};

ComponentFilterSinglePicker.propTypes = {
  setFilterValue: PropTypes.func.isRequired,
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
