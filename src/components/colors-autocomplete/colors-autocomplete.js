import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField, Checkbox } from '@material-ui/core';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import PropTypes from 'prop-types';
import { useStyles } from './colors-autocomplete.styles';
import ColorCircle from '../color-circle';
import { config } from '../../configs';
import { CustomizedDeleteIcon } from '../icons';

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
const checkedIcon = <CheckBoxIcon fontSize='small' />;
const { SMALL_CIRCLE } = config.colorCircleSizes;
const { mainLabel } = config.labels.color;
const { SMALL_SIZE } = config.iconSizes;

const ColorsAutocomplete = ({
  colorsSet,
  selectedColors,
  handleChange,
  deleteHandler
}) => {
  const styles = useStyles();

  return (
    <Autocomplete
      className={styles.root}
      multiple
      id='tags-filled'
      options={colorsSet}
      value={selectedColors}
      disableCloseOnSelect
      getOptionLabel={(option) => option.name[0].value}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <div key={option._id} className={styles.colorCircleInTextfield}>
            <ColorCircle
              color={option.colorHex}
              colorName={option.name[0].value}
              size={SMALL_CIRCLE}
              {...getTagProps({ index })}
            />
          </div>
        ))
      }
      getOptionSelected={(option, value) => option._id === value._id}
      renderOption={(option, { selected }) => (
        <div className={styles.selectOptionRow}>
          <div>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              className={styles.checkbox}
              checked={selected}
            />
            <ColorCircle color={option.colorHex} size={SMALL_CIRCLE} />
            {option.name[0].value}
          </div>
          {deleteHandler && (
            <CustomizedDeleteIcon
              size={SMALL_SIZE}
              onClickHandler={(e) => {
                e.stopPropagation();
                deleteHandler(option._id);
              }}
            />
          )}
        </div>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          variant='outlined'
          label={mainLabel}
          placeholder={mainLabel}
        />
      )}
      onChange={(e, value) => {
        handleChange(value);
      }}
    />
  );
};

const valueShape = PropTypes.shape({
  value: PropTypes.string
});

const colorsType = PropTypes.shape({
  _id: PropTypes.string,
  colorHex: PropTypes.string,
  name: PropTypes.arrayOf(valueShape),
  simpleName: PropTypes.arrayOf(valueShape)
});

ColorsAutocomplete.propTypes = {
  colorsSet: PropTypes.arrayOf(colorsType).isRequired,
  selectedColors: PropTypes.oneOfType([colorsType, PropTypes.array]).isRequired,
  handleChange: PropTypes.func.isRequired,
  deleteHandler: PropTypes.func
};

ColorsAutocomplete.defaultProps = {
  deleteHandler: null
};

export default ColorsAutocomplete;
