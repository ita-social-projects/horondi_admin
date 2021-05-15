import React from 'react';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import _ from 'lodash';

import {useStyles} from './filter-by-date.styles';
import materialUiConstants from "../../../configs/material-ui-constants";
import {generateDateFormatForInputValue} from "../../../utils/history";

const NavFilterByDate = ({filterByDateOptions: {filters, dateHandler, title}}) => {
    const styles = useStyles();

    const setDateHandler = ({target}) => {
        if (target.value) {
            dateHandler(new Date(target.value).getTime());
        }
    };

    return (
        <form className={styles.container} noValidate>
            <TextField
                id={materialUiConstants.types.datetimeLocal}
                onBlur={setDateHandler}
                label={title}
                defaultValue={filters ? generateDateFormatForInputValue(filters) : ''}
                type={materialUiConstants.types.datetimeLocal}
                className={styles.textField}
                InputLabelProps={{
                    shrink: true
                }}
            />
        </form>
    );
};

NavFilterByDate.propTypes = {
    filters: PropTypes.string,
    title: PropTypes.string,
    setDateRangeFilter: PropTypes.func
};

NavFilterByDate.defaultProps = {
    filters: '',
    setDateRangeFilter: _.noop,
    title: ''
};

export default NavFilterByDate;
