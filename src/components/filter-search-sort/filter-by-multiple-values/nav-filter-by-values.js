import React from 'react';
import {
    Badge,
    FormControl,
    Input,
    InputLabel,
    Select
} from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import PropTypes from 'prop-types';
import _ from 'lodash';

import {useStyles} from './filter-by-multiple-values.styles';
import materialUiConstants from "../../../configs/material-ui-constants";
import {MenuProps} from "../../../pages/email-questions/email-question-filter/email-question-filter.styles";
import {badgePosition} from "../../../configs";
import {filterInputToRender} from "../../../utils/history";


const NavFilterByValues = (
    {
        filterByMultipleOptions: {
            filters,
            setFilterHandler,
            label,
            selectItems,
            objForTranslateRenderItems,
        }
    }
) => {
    const styles = useStyles();

    const handleChangeMultiple = ({target}) => {
        if (target.value) {
            setFilterHandler(target.value);
        }
    };

    return (
        <div>
            <Badge
                badgeContent={filters.length}
                color={materialUiConstants.styleError}
                anchorOrigin={badgePosition}
            >
                <FormControl style={{minWidth: 170}} className={styles.formControl}>
                    <InputLabel id={materialUiConstants.checkBoxLabel}>
                        {label}
                    </InputLabel>
                    <Select
                        labelId={materialUiConstants.checkBoxLabel}
                        id={materialUiConstants.checkBoxId}
                        multiple
                        value={filters}
                        onChange={handleChangeMultiple}
                        input={<Input/>}
                        renderValue={(selected) =>
                            filterInputToRender(selected, objForTranslateRenderItems)
                        }
                        autoWidth={true}
                        MenuProps={MenuProps}
                    >
                        {selectItems.map((item) => (
                            <MenuItem key={item.key} value={item.key}>
                                <Checkbox checked={filters.indexOf(item.key) > -1}/>
                                <ListItemText primary={item.value}/>
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Badge>
        </div>
    );
};

NavFilterByValues.propTypes = {
    filters: PropTypes.arrayOf(PropTypes.string),
    selectItems: PropTypes.arrayOf(PropTypes.string),
    setFilterHandler: PropTypes.func,
    label: PropTypes.string,
    objForTranslateRenderItems: PropTypes.objectOf(PropTypes.object),
    renderFilterItems: PropTypes.arrayOf(PropTypes.string)
};

NavFilterByValues.defaultProps = {
    filters: [],
    selectItems: [],
    setFilterHandler: _.noop,
    label: '',
    objForTranslateRenderItems: {},
    renderFilterItems: []
};

export default NavFilterByValues;
