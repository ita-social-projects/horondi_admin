import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField } from '@material-ui/core';

import { config } from '../../../../../configs';
import { useStyles } from './ukrpost.styles';
import {
  getUkrPostCities,
  getUkrPostDistricts,
  getUkrPostPostOffices,
  getUkrPostRegions
} from '../../../../../redux/orders/orders.actions';
import configs from '../../../../../configs/orders';
import {
  inputName,
  postPropTypes,
  POST_OFFICE_NUMBER
} from '../../../../../utils/order';
import {
  handleCircularProgress,
  handleCity,
  handleDistrict,
  handlePostOffice,
  handleRegion,
  handleInputValue
} from '../../../../../utils/handle-orders-page';
import {
  isFieldError,
  getError
} from '../../../../../utils/form-error-validation';
import { getOptionSelected } from '../../../../../utils/handle-delivery';

const UkrPost = ({ values, setFieldValue, inputOptions }) => {
  const { materialUiConstants } = config;
  const { deliveryTitles, deliveryAdditionalInfo, deliveryLabels } = configs;

  const dispatch = useDispatch();
  const styles = useStyles();

  const [regionFocus, setRegionFocus] = useState(false);
  const [districtFocus, setDistrictFocus] = useState(false);
  const [cityFocus, setCityFocus] = useState(false);
  const [departmentFocus, setDepartmentFocus] = useState(false);

  const {
    deliveryLoading,
    ukrPoshtaCities,
    ukrPoshtaRegions,
    ukrPoshtaDistricts,
    ukrPoshtaPostOffices
  } = useSelector(({ Orders }) => ({
    deliveryLoading: Orders.deliveryLoading,
    ukrPoshtaCities: Orders.ukrPoshtaCities,
    ukrPoshtaRegions: Orders.ukrPoshtaRegions,
    ukrPoshtaDistricts: Orders.ukrPoshtaDistricts,
    ukrPoshtaPostOffices: Orders.ukrPoshtaPostOffices
  }));

  useEffect(() => {
    dispatch(getUkrPostRegions());
  }, [dispatch]);

  const { handleBlur, touched, errors } = inputOptions;

  const [region, setRegion] = useState('');
  const [district, setDistrict] = useState('');
  const [city, setCity] = useState('');
  const [postOffice, setPostOffice] = useState('');

  useEffect(() => {
    if (values.regionId) {
      dispatch(getUkrPostDistricts(values.regionId));
    }
  }, [dispatch, values.regionId]);

  useEffect(() => {
    if (values.districtId) {
      dispatch(getUkrPostCities(values.districtId));
    }
  }, [dispatch, values.districtId]);

  useEffect(() => {
    if (values.cityId) {
      dispatch(getUkrPostPostOffices(values.cityId));
    }
  }, [dispatch, values.cityId]);

  const handleBlurRegion = useCallback(
    (e) => {
      setRegionFocus(false);
      handleBlur(e);
    },
    [handleBlur]
  );

  const handleBlurDistrict = useCallback(
    (e) => {
      setDistrictFocus(false);
      handleBlur(e);
    },
    [handleBlur]
  );

  return (
    <div>
      <h3 className={styles.ukrPostTitle}>{deliveryTitles.ukrPost}</h3>
      <div className={styles.selectorInfo}>
        <Autocomplete
          id={inputName.ukrPost.region}
          onInputChange={(_e, value) => {
            setRegion(value);
          }}
          noOptionsText={deliveryAdditionalInfo.noOneRegion}
          onFocus={() => setRegionFocus(true)}
          onBlur={handleBlurRegion}
          onChange={(_event, value) => {
            handleRegion(
              value,
              setFieldValue,
              setRegion,
              setDistrict,
              setCity,
              setPostOffice
            );
          }}
          options={ukrPoshtaRegions}
          inputValue={handleInputValue(regionFocus, region, values.region)}
          getOptionLabel={(option) => option?.REGION_UA || ''}
          getOptionSelected={getOptionSelected}
          className={styles.dataInput}
          data-testid='regionUkrPost'
          renderInput={(params) => (
            <TextField
              {...params}
              label={deliveryLabels.region}
              variant={materialUiConstants.outlined}
              error={isFieldError(inputName.ukrPost.region, errors, touched)}
              helperText={
                isFieldError(inputName.ukrPost.region, errors, touched)
                  ? getError(inputName.ukrPost.region, errors)
                  : ' '
              }
              FormHelperTextProps={{
                'data-testid': `${inputName.ukrPost.region}`
              }}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {handleCircularProgress(deliveryLoading)}
                    {params.InputProps.endAdornment}
                  </>
                )
              }}
            />
          )}
        />
      </div>
      <div className={styles.selectorInfo}>
        <Autocomplete
          id={inputName.ukrPost.district}
          onInputChange={(_e, value) => {
            setDistrict(value);
          }}
          onFocus={() => setDistrictFocus(true)}
          onBlur={handleBlurDistrict}
          noOptionsText={deliveryAdditionalInfo.noOneDistrict}
          onChange={(_event, value) => {
            handleDistrict(value, setFieldValue, setCity, setPostOffice);
          }}
          disabled={!values.regionId}
          options={ukrPoshtaDistricts}
          inputValue={handleInputValue(
            districtFocus,
            district,
            values.district
          )}
          getOptionLabel={(option) => option?.DISTRICT_UA || ''}
          getOptionSelected={getOptionSelected}
          className={styles.dataInput}
          renderInput={(params) => (
            <TextField
              {...params}
              label={deliveryLabels.district}
              variant={materialUiConstants.outlined}
              error={
                isFieldError(inputName.ukrPost.district, errors, touched) &&
                !!region
              }
              helperText={
                isFieldError(inputName.ukrPost.district, errors, touched) &&
                !!region
                  ? getError(inputName.ukrPost.district, errors)
                  : ' '
              }
              FormHelperTextProps={{
                'data-testid': `${inputName.ukrPost.district}`
              }}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {handleCircularProgress(deliveryLoading)}
                    {params.InputProps.endAdornment}
                  </>
                )
              }}
            />
          )}
        />
      </div>
      <div className={styles.selectorInfo}>
        <Autocomplete
          id={inputName.ukrPost.city}
          onInputChange={(_e, value) => {
            setCity(value);
          }}
          onFocus={() => setCityFocus(true)}
          onBlur={(e) => {
            setCityFocus(false);
            handleBlur(e);
          }}
          noOptionsText={deliveryAdditionalInfo.noOneCity}
          onChange={(_event, value) => {
            handleCity(value, setFieldValue, setPostOffice);
          }}
          disabled={!values.districtId}
          options={ukrPoshtaCities}
          inputValue={handleInputValue(cityFocus, city, values.city)}
          getOptionLabel={(option) => option?.CITY_UA || ''}
          getOptionSelected={getOptionSelected}
          className={styles.dataInput}
          renderInput={(params) => (
            <TextField
              {...params}
              label={deliveryLabels.city}
              error={
                isFieldError(inputName.ukrPost.city, errors, touched) &&
                !!district
              }
              variant={materialUiConstants.outlined}
              helperText={
                isFieldError(inputName.ukrPost.city, errors, touched) &&
                !!district
                  ? getError(inputName.ukrPost.city, errors)
                  : ' '
              }
              FormHelperTextProps={{
                'data-testid': `${inputName.ukrPost.city}`
              }}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {handleCircularProgress(deliveryLoading)}
                    {params.InputProps.endAdornment}
                  </>
                )
              }}
            />
          )}
        />
      </div>
      <div className={styles.selectorInfo}>
        <Autocomplete
          id={inputName.ukrPost.courierOffice}
          onInputChange={(_e, value) => {
            setPostOffice(value);
          }}
          noOptionsText={deliveryAdditionalInfo.noOneDepartment}
          onChange={(_event, value) => {
            handlePostOffice(value, setPostOffice, setFieldValue);
          }}
          onFocus={() => setDepartmentFocus(true)}
          onBlur={(e) => {
            setDepartmentFocus(false);
            handleBlur(e);
          }}
          disabled={!values.cityId}
          options={ukrPoshtaPostOffices}
          inputValue={handleInputValue(
            departmentFocus,
            postOffice,
            values.courierOffice
          )}
          getOptionLabel={(option) =>
            `${POST_OFFICE_NUMBER} ${option?.POSTCODE}, ${
              option?.STREET_UA_VPZ ? option?.STREET_UA_VPZ : ''
            }` || ''
          }
          getOptionSelected={getOptionSelected}
          className={styles.dataInput}
          renderInput={(params) => (
            <TextField
              {...params}
              label={deliveryLabels.department}
              variant={materialUiConstants.outlined}
              error={
                isFieldError(
                  inputName.ukrPost.courierOffice,
                  errors,
                  touched
                ) && !!city
              }
              helperText={
                isFieldError(
                  inputName.ukrPost.courierOffice,
                  errors,
                  touched
                ) && !!city
                  ? getError(inputName.ukrPost.courierOffice, errors)
                  : ' '
              }
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {handleCircularProgress(deliveryLoading)}
                    {params.InputProps.endAdornment}
                  </>
                )
              }}
            />
          )}
        />
      </div>
    </div>
  );
};

UkrPost.propTypes = postPropTypes;

export default UkrPost;
