import React, { useState, useEffect } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField
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
    values.worldWideCountry,
    setFieldValue,
    worldWide.stateOrProvince,
    worldWide.worldWideCity,
    worldWide.worldWideStreet,
    worldWide.cityCode
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

  return (
    <div className={styles.worldwide}>
      <h3 className={styles.addressTitle}>{deliveryTitles.worldWide}</h3>
      <div className={styles.selectWrapper}>
        <FormControl
          className={styles.formControl}
          variant={materialUiConstants.outlined}
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
            error={isFieldError(worldWide.messenger, errors, touched)}
          >
            {messengers.map((messenger) => (
              <MenuItem key={messenger} value={messenger}>
                {messenger}
              </MenuItem>
            ))}
          </Select>
          {isFieldError(worldWide.messenger, errors, touched) && (
            <div
              className={styles.inputError}
              data-testid={worldWide.messenger}
            >
              {getError(worldWide.messenger, errors)}
            </div>
          )}
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
          />
          {isFieldError(worldWide.messengerPhone, errors, touched) && (
            <div
              className={styles.inputError}
              data-testid={worldWide.messengerPhone}
            >
              {getError(worldWide.messengerPhone, errors)}
            </div>
          )}
        </FormControl>
      </div>
      <div className={styles.addressWrapper}>
        <Autocomplete
          id={worldWide.worldWideCountry}
          className={styles.addressInput}
          options={countryOptions}
          value={values.worldWideCountry}
          inputValue={countryInputState}
          data-testid='worldWideCountry'
          onInputChange={(_, value) => setCountryInput(value)}
          onChange={(_, value) =>
            setFieldValue(worldWide.worldWideCountry, value || '')
          }
          onBlur={handleBlur}
          renderInput={(params) => (
            <TextField
              {...params}
              label={deliveryLabels.country}
              error={isFieldError(worldWide.worldWideCountry, errors, touched)}
              variant={materialUiConstants.outlined}
            />
          )}
        />
        {isFieldError(worldWide.worldWideCountry, errors, touched) && (
          <div
            className={styles.inputError}
            data-testid={worldWide.worldWideCountry}
          >
            {getError(worldWide.worldWideCountry, errors)}
          </div>
        )}
        <Autocomplete
          id={worldWide.stateOrProvince}
          className={styles.addressInput}
          options={statesOptions}
          value={values.stateOrProvince}
          inputValue={stateOrProvinceInput}
          onInputChange={(_, value) => setStateOrProvinceInput(value)}
          disabled={!values.worldWideCountry}
          data-testid='stateOrProvince'
          onChange={(_, value) =>
            setFieldValue(worldWide.stateOrProvince, value || '')
          }
          onBlur={handleBlur}
          renderInput={(params) => (
            <TextField
              {...params}
              label={deliveryLabels.stateOrProvince}
              variant={materialUiConstants.outlined}
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
          disabled={!values.worldWideCountry}
          data-testid='worldWideCity'
          onChange={(_, value) =>
            setFieldValue(worldWide.worldWideCity, value || '')
          }
          onBlur={handleBlur}
          renderInput={(params) => (
            <TextField
              {...params}
              error={isFieldError(worldWide.worldWideCity, errors, touched)}
              label={deliveryLabels.city}
              variant={materialUiConstants.outlined}
            />
          )}
        />
        {isFieldError(worldWide.worldWideCity, errors, touched) && (
          <div
            className={styles.inputError}
            data-testid={worldWide.worldWideCity}
          >
            {getError(worldWide.worldWideCity, errors)}
          </div>
        )}
        <TextField
          id={worldWide.worldWideStreet}
          className={styles.addressInput}
          label={deliveryLabels.street}
          variant={materialUiConstants.outlined}
          value={values.worldWideStreet}
          name={worldWide.worldWideStreet}
          onChange={handleChange}
          onBlur={handleBlur}
          error={isFieldError(worldWide.worldWideStreet, errors, touched)}
          disabled={!values.worldWideCity}
        />
        {isFieldError(worldWide.worldWideStreet, errors, touched) && (
          <div
            className={styles.inputError}
            data-testid={worldWide.worldWideStreet}
          >
            {getError(worldWide.worldWideStreet, errors)}
          </div>
        )}
        <TextField
          id={worldWide.cityCode}
          className={`${styles.addressInput} ${styles.addressInputCode}`}
          label={deliveryLabels.cityCode}
          variant={materialUiConstants.outlined}
          value={values.cityCode}
          name={worldWide.cityCode}
          onChange={handleChange}
          onBlur={handleBlur}
          error={isFieldError(worldWide.cityCode, errors, touched)}
          disabled={!values.worldWideStreet}
        />
        {isFieldError(worldWide.cityCode, errors, touched) && (
          <div className={styles.inputError} data-testid={worldWide.cityCode}>
            {getError(worldWide.cityCode, errors)}
          </div>
        )}
      </div>
    </div>
  );
};

Worldwide.propTypes = worldWidePropTypes;

export default Worldwide;
