import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Paper, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useDispatch, useSelector } from 'react-redux';
import { useStyles } from './autocomplete-options.styles';
import { getAllPositions } from '../../redux/position/position.actions';
import { handleCircularProgress } from '../../utils/handle-orders-page';

const AutoCompleteOptions = ({
  autocompleteLabels,
  values,
  errors,
  touched,
  handleBlur,
  setFieldValue
}) => {
  const styles = useStyles;
  const dispatch = useDispatch();

  const { labelIdAut, margin, variant, choosePositions, codeError } =
    autocompleteLabels;

  useEffect(() => {
    dispatch(
      getAllPositions({
        pagination: {
          skip: null,
          limit: null
        }
      })
    );
  }, [dispatch]);

  const { positionsList, loadingPositions } = useSelector(({ Positions }) => ({
    positionsList: Positions.list.items,
    loadingPositions: Positions.positionsLoading
  }));

  const availablePositions =
    positionsList && positionsList.length
      ? positionsList.filter((el) => el.available)
      : [];

  const [positions, setPositions] = useState(values.positions || []);

  const onTagsChange = (_, value) => {
    setFieldValue('positions', value);
    setPositions(value);
  };

  return (
    <>
      <Paper className={styles.inputPanel}>
        <Autocomplete
          id={labelIdAut}
          className={styles.textField}
          multiple
          freeSolo
          filterSelectedOptions
          options={availablePositions}
          getOptionSelected={(option, value) => option._id === value._id}
          value={positions}
          onChange={onTagsChange}
          onBlur={handleBlur}
          getOptionLabel={(option) => `${option.name[0].value}`}
          renderInput={(params) => (
            <TextField
              {...params}
              variant={variant}
              label={choosePositions.title}
              placeholder={choosePositions.inputTitle}
              margin={margin}
              fullWidth
              error={touched.labelIdAut && !!errors.positions}
              InputProps={{
                ...params.InputProps,
                endAdornment: <>{handleCircularProgress(loadingPositions)}</>
              }}
            />
          )}
        />
        {touched.labelIdAut && errors.positions && (
          <div data-cy={codeError} className={styles.error}>
            {errors.positions}
          </div>
        )}
      </Paper>
    </>
  );
};

// TODO: check propTypes
AutoCompleteOptions.propTypes = {
  autocompleteLabels: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.object])
  ).isRequired,
  values: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
      PropTypes.number,
      PropTypes.array
    ])
  ).isRequired,
  errors: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
      PropTypes.number,
      PropTypes.array
    ])
  ).isRequired,
  touched: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
      PropTypes.number,
      PropTypes.array
    ])
  ).isRequired,
  handleBlur: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired
};

export default AutoCompleteOptions;
