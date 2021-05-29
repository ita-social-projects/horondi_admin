// import React from 'react';
// import TextField from '@material-ui/core/TextField';
// import PropTypes from 'prop-types';
// import _ from 'lodash';
//
// import {useStyles} from './filter-by-date.styles';
// import materialUiConstants from "../../../configs/material-ui-constants";
// import {generateDateFormatForInputValue} from "../../../utils/history";
//
// const NavFilterByDate = ({filterByDateOptions: {filters, dateHandler, title}}) => {
//     const styles = useStyles();
//     const setDateHandler = ({target}) => {
//         if (target.value) {
//             dateHandler(new Date(target.value).getTime());
//         }
//     };
//
//     return (
//         <form className={styles.container} noValidate>
//             <TextField
//                 id={materialUiConstants.types.datetimeLocal}
//                 onBlur={setDateHandler}
//                 label={title}
//                 defaultValue={filters ? generateDateFormatForInputValue(filters) : ''}
//                 type={materialUiConstants.types.datetimeLocal}
//                 className={styles.textField}
//                 InputLabelProps={{
//                     shrink: true
//                 }}
//             />
//         </form>
//     );
// };
//
// NavFilterByDate.propTypes = {
//     filters: PropTypes.string,
//     title: PropTypes.string,
//     setDateRangeFilter: PropTypes.func
// };
//
// NavFilterByDate.defaultProps = {
//     filters: '',
//     setDateRangeFilter: _.noop,
//     title: ''
// };
//
// export default NavFilterByDate;

import React, { useState } from 'react';
import { DateRangePicker } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';

const NavFilterByDate = (filterByDateOptions) => {
  const [value, setValue] = useState([
    new Date('2021-05-20'),
    new Date('2021-05-29')
  ]);

  const setDateHandler = (v) => {
    setValue(v);
    if (filterByDateOptions) {
      filterByDateOptions.filterByDateOptions[0].dateHandler(v[0].getTime());
      filterByDateOptions.filterByDateOptions[1].dateHandler(v[1].getTime());
    }
  };

  return (
    <DateRangePicker
      format='DD-MM-YYYY'
      appearance='default'
      placeholder='Default'
      style={{ width: 280 }}
      value={value}
      onChange={(value) => setDateHandler(value)}
    />
  );
};
export default NavFilterByDate;
