import React, { useState, useEffect } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { get } from 'lodash';
import { messengers } from './const';
import { useStyles } from './worldwide.styles';
import { config } from '../../../../../configs';
import configs from '../../../../../configs/orders';
import { inputName, worldWidePropTypes } from '../../../../../utils/order';
import WorldwideService from '../../../../../services/worldwide-delivery.service';

const Worldwide = ({ values, handleChange, setFieldValue, inputOptions }) => {
  const styles = useStyles();

  const { handleBlur, touched, errors } = inputOptions;
  const getError = (field) => get(errors, field);
  const getTouched = (field) => get(touched, field);

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
  }, [values.worldWideCountry]);

  useEffect(() => {
    if (values.stateOrProvince) {
      fetchCitiesByCountryAndState(
        values.worldWideCountry,
        values.stateOrProvince
      );
    } else {
      setCitiesOptions([]);
    }
  }, [values.stateOrProvince]);

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
          >
            {messengers.map((messenger) => (
              <MenuItem key={messenger} value={messenger}>
                {messenger}
              </MenuItem>
            ))}
          </Select>
          {getTouched(worldWide.messenger) && getError(worldWide.messenger) && (
            <div className={styles.inputError}>
              {getError(worldWide.messenger)}
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
          />
          {getTouched(worldWide.messengerPhone) &&
            getError(worldWide.messengerPhone) && (
              <div className={styles.inputError}>
                {getError(worldWide.messengerPhone)}
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
              variant={materialUiConstants.outlined}
            />
          )}
        />
        {getTouched(worldWide.worldWideCountry) &&
          getError(worldWide.worldWideCountry) && (
            <div className={styles.inputError}>
              {getError(worldWide.worldWideCountry)}
            </div>
          )}
        <Autocomplete
          id={worldWide.stateOrProvince}
          className={styles.addressInput}
          // name={worldWide.stateOrProvince}
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
        {getTouched(worldWide.stateOrProvince) &&
          getError(worldWide.stateOrProvince) && (
            <div className={styles.inputError}>
              {getError(worldWide.stateOrProvince)}
            </div>
          )}
        <Autocomplete
          id={worldWide.worldWideCity}
          className={styles.addressInput}
          // name={worldWide.worldWideCity}
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
              label={deliveryLabels.city}
              variant={materialUiConstants.outlined}
            />
          )}
        />
        {getTouched(worldWide.worldWideCity) &&
          getError(worldWide.worldWideCity) && (
            <div className={styles.inputError}>
              {getError(worldWide.worldWideCity)}
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
          disabled={!values.worldWideCity}
        />
        {getTouched(worldWide.worldWideStreet) &&
          getError(worldWide.worldWideStreet) && (
            <div className={styles.inputError}>
              {getError(worldWide.worldWideStreet)}
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
          disabled={!values.worldWideStreet}
        />
        {getTouched(worldWide.cityCode) && getError(worldWide.cityCode) && (
          <div className={styles.inputError}>
            {getError(worldWide.cityCode)}
          </div>
        )}
      </div>
    </div>
  );
};

Worldwide.propTypes = worldWidePropTypes;

export default Worldwide;
