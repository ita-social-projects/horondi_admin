import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import OptionPicker from '../../filters/option-picker';
import { setCurrentPage } from '../../../redux/table/table.actions';

const ComponentFilterRadioPicker = ({
  setFilterValue,
  actionSetLabel,
  value,
  options,
  label,
  selectorFunc
}) => {
  const dispatch = useDispatch();

  const setSortFilter = ({ _key, _type, value: sortValue }) => {
    dispatch(setCurrentPage(0));
    dispatch(setFilterValue(selectorFunc(value)));
    dispatch(actionSetLabel(sortValue));
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
  setFilterValue: PropTypes.func.isRequired,
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
