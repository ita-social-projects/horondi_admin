import React, { useState, useEffect, useCallback } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  FormHelperText
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { messengers } from './const';
import { useStyles } from './worldwide.styles';
import { config } from '../../../../../configs';
import configs from '../../../../../configs/orders';
import { inputName, worldWidePropTypes } from '../../../../../utils/order';
import WorldwideService from '../../../../../services/worldwide-delivery.service';
import {
  isFieldError,
  getError
} from '../../../../../utils/form-error-validation';
import {
  handleStateOrProvince,
  handleWorldWideCity,
  handleWorldWideCountry
} from '../../../../../utils/handle-orders-page';
import { getOptionSelected } from '../../../../../utils/handle-delivery';

const Worldwide = ({ values, handleChange, setFieldValue, inputOptions }) => {
  const styles = useStyles();

  const { handleBlur, touched, errors } = inputOptions;

  const { deliveryTitles, deliveryLabels } = configs;
  const { materialUiConstants, RESET } = config;
  const { worldWide } = inputName;

  const [countryOptions, setCountryOptions] = useState([]);
  const [statesOptions, setStatesOptions] = useState([]);
  const [citiesOptions, setCitiesOptions] = useState([]);

  const [countryInputState, setCountryInput] = useState('');
  const [stateOrProvinceInput, setStateOrProvinceInput] = useState('');

  const handleCityInputChange = (value, reason) => {
    if (reason !== RESET || (reason === RESET && value)) {
      setFieldValue(worldWide.worldWideCity, value);
    }
  };

  const fetchCountries = async () => {
    const countries = await WorldwideService.getCountries();

    setCountryOptions(countries);
  };

  const fetchStatesByCountry = async (country) => {
    const states = await WorldwideService.getStatesByCountry(country);

    setStatesOptions(states);
  };

  const fetchCitiesByCountryAndState = async (country, state) => {
    const cities = await WorldwideService.getCitiesByCountryAndState(
      country,
      state
    );

    setCitiesOptions(cities);
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    if (values.worldWideCountry) {
      fetchStatesByCountry(values.worldWideCountry);
    } else {
      setFieldValue(worldWide.stateOrProvince, '');
      setFieldValue(worldWide.worldWideCity, '');
      setFieldValue(worldWide.worldWideStreet, '');
      setFieldValue(worldWide.cityCode, '');
      setStatesOptions([]);
      setCitiesOptions([]);
    }
  }, [
    setFieldValue,
    worldWide.cityCode,
    worldWide.stateOrProvince,
    worldWide.worldWideCity,
    worldWide.worldWideStreet,
    values.worldWideCountry
  ]);

  useEffect(() => {
    if (values.stateOrProvince) {
      fetchCitiesByCountryAndState(
        values.worldWideCountry,
        values.stateOrProvince
      );
    } else {
      setCitiesOptions([]);
    }
  }, [values.stateOrProvince, values.worldWideCountry]);

  const handleChangeCountry = useCallback(
    (_, value) => {
      handleWorldWideCountry(value, setFieldValue);
    },
    [setFieldValue]
  );

  const handleChangeStateOrProvince = useCallback(
    (_, value) => {
      handleStateOrProvince(value, setFieldValue);
    },
    [setFieldValue]
  );

  const handleChangeCity = useCallback(
    (_, value) => {
      handleWorldWideCity(value, setFieldValue);
    },
    [setFieldValue]
  );

  return (
    <div className={styles.worldwide}>
      <h3 className={styles.addressTitle}>{deliveryTitles.worldWide}</h3>
      <div className={styles.selectWrapper}>
        <FormControl
          className={styles.formControl}
          variant={materialUiConstants.outlined}
          error={isFieldError(worldWide.messenger, errors, touched)}
        >
          <InputLabel variant={materialUiConstants.outlined}>
            {deliveryLabels.messenger}
          </InputLabel>
          <Select
            id={worldWide.messenger}
            className={styles.paymentSelect}
            label={deliveryLabels.messenger}
            value={values.messenger}
            name={worldWide.messenger}
            onChange={handleChange}
            onBlur={handleBlur}
            data-testid='select'
            error={isFieldError(worldWide.messenger, errors, touched)}
          >
            {messengers.map((messenger) => (
              <MenuItem key={messenger} value={messenger}>
                {messenger}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>
            {isFieldError(worldWide.messenger, errors, touched)
              ? getError(worldWide.messenger, errors)
              : ' '}
          </FormHelperText>
        </FormControl>
        <FormControl>
          <TextField
            id={worldWide.messengerPhone}
            className={styles.formControl}
            label={deliveryLabels.messengerPhone}
            variant={materialUiConstants.outlined}
            value={values.messengerPhone}
            name={worldWide.messengerPhone}
            onChange={handleChange}
            onBlur={handleBlur}
            error={isFieldError(worldWide.messengerPhone, errors, touched)}
            helperText={
              isFieldError(worldWide.messengerPhone, errors, touched)
                ? getError(worldWide.messengerPhone, errors)
                : ' '
            }
            FormHelperTextProps={{
              'data-testid': `${worldWide.messengerPhone}`
            }}
          />
        </FormControl>
      </div>
      <div className={styles.addressWrapper}>
        <Autocomplete
          id={worldWide.worldWideCountry}
          className={styles.addressInput}
          options={countryOptions}
          getOptionSelected={getOptionSelected}
          value={values.worldWideCountry}
          inputValue={countryInputState}
          data-testid='worldWideCountry'
          onInputChange={(_, value) => setCountryInput(value)}
          onChange={handleChangeCountry}
          onBlur={handleBlur}
          renderInput={(params) => (
            <TextField
              {...params}
              label={deliveryLabels.country}
              error={isFieldError(worldWide.worldWideCountry, errors, touched)}
              variant={materialUiConstants.outlined}
              helperText={
                isFieldError(worldWide.worldWideCountry, errors, touched)
                  ? getError(worldWide.worldWideCountry, errors)
                  : ' '
              }
              FormHelperTextProps={{
                'data-testid': `${worldWide.worldWideCountry}`
              }}
            />
          )}
        />
        <Autocomplete
          id={worldWide.stateOrProvince}
          className={styles.addressInput}
          options={statesOptions}
          value={values.stateOrProvince}
          inputValue={stateOrProvinceInput}
          getOptionSelected={getOptionSelected}
          onInputChange={(_, value) => setStateOrProvinceInput(value)}
          disabled={!values.worldWideCountry}
          data-testid='stateOrProvince'
          onChange={handleChangeStateOrProvince}
          onBlur={handleBlur}
          renderInput={(params) => (
            <TextField
              {...params}
              label={deliveryLabels.stateOrProvince}
              variant={materialUiConstants.outlined}
              error={
                isFieldError(worldWide.stateOrProvince, errors, touched) &&
                !!countryInputState
              }
              helperText={
                isFieldError(worldWide.stateOrProvince, errors, touched) &&
                !!countryInputState
                  ? getError(worldWide.stateOrProvince, errors)
                  : ' '
              }
              FormHelperTextProps={{
                'data-testid': `${worldWide.stateOrProvince}`
              }}
            />
          )}
        />
        <Autocomplete
          id={worldWide.worldWideCity}
          className={styles.addressInput}
          options={citiesOptions}
          inputValue={values.worldWideCity}
          onInputChange={(_, value, reason) => {
            handleCityInputChange(value, reason);
          }}
          disabled={!values.stateOrProvince}
          data-testid='worldWideCity'
          getOptionSelected={getOptionSelected}
          onChange={handleChangeCity}
          onBlur={handleBlur}
          renderInput={(params) => (
            <TextField
              {...params}
              error={
                isFieldError(worldWide.worldWideCity, errors, touched) &&
                !!stateOrProvinceInput
              }
              label={deliveryLabels.city}
              variant={materialUiConstants.outlined}
              helperText={
                isFieldError(worldWide.worldWideCity, errors, touched) &&
                !!stateOrProvinceInput
                  ? getError(worldWide.worldWideCity, errors)
                  : ' '
              }
              FormHelperTextProps={{
                'data-testid': `${worldWide.worldWideCity}`
              }}
            />
          )}
        />
        <TextField
          id={worldWide.worldWideStreet}
          className={styles.addressInput}
          label={deliveryLabels.street}
          variant={materialUiConstants.outlined}
          value={values.worldWideStreet}
          name={worldWide.worldWideStreet}
          onChange={handleChange}
          onBlur={handleBlur}
          error={
            isFieldError(worldWide.worldWideStreet, errors, touched) &&
            !!values.worldWideCity
          }
          disabled={!values.worldWideCity}
          helperText={
            isFieldError(worldWide.worldWideStreet, errors, touched) &&
            !!values.worldWideCity
              ? getError(worldWide.worldWideStreet, errors)
              : ' '
          }
          FormHelperTextProps={{
            'data-testid': `${worldWide.worldWideStreet}`
          }}
        />
        <TextField
          id={worldWide.cityCode}
          className={`${styles.addressInput} ${styles.addressInputCode}`}
          label={deliveryLabels.cityCode}
          variant={materialUiConstants.outlined}
          value={values.cityCode}
          name={worldWide.cityCode}
          onChange={handleChange}
          onBlur={handleBlur}
          error={
            isFieldError(worldWide.cityCode, errors, touched) &&
            !!values.worldWideStreet
          }
          disabled={!values.worldWideStreet}
          helperText={
            isFieldError(worldWide.cityCode, errors, touched) &&
            !!values.worldWideStreet
              ? getError(worldWide.cityCode, errors)
              : ' '
          }
          FormHelperTextProps={{
            'data-testid': `${worldWide.cityCode}`
          }}
        />
      </div>
    </div>
  );
};

Worldwide.propTypes = worldWidePropTypes;

export default Worldwide;
