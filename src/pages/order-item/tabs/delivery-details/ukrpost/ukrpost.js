import React, { useEffect, useState } from 'react';
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
import { postPropTypes, POST_OFFICE_NUMBER } from '../../../../../utils/order';
import {
  handleCircularProgress,
  handleCity,
  handleDistrict,
  handlePostOffice,
  handleRegion,
  handleInputValue
} from '../../../../../utils/handle-orders-page';

const UkrPost = ({ values, setFieldValue }) => {
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
  }, []);

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

  return (
    <div>
      <h3 className={styles.ukrPostTitle}>{deliveryTitles.ukrPost}</h3>
      <div className={styles.selectorInfo}>
        <Autocomplete
          onInputChange={(e, value) => {
            setRegion(value);
          }}
          noOptionsText={deliveryAdditionalInfo.noOneRegion}
          onFocus={() => setRegionFocus(true)}
          onBlur={() => setRegionFocus(false)}
          onChange={(event, value) => {
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
          className={styles.dataInput}
          renderInput={(params) => (
            <TextField
              {...params}
              label={deliveryLabels.region}
              variant={materialUiConstants.outlined}
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
          onInputChange={(e, value) => {
            setDistrict(value);
          }}
          onFocus={() => setDistrictFocus(true)}
          onBlur={() => setDistrictFocus(false)}
          noOptionsText={deliveryAdditionalInfo.noOneDistrict}
          onChange={(event, value) => {
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
          className={styles.dataInput}
          renderInput={(params) => (
            <TextField
              {...params}
              label={deliveryLabels.district}
              variant={materialUiConstants.outlined}
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
          onInputChange={(e, value) => {
            setCity(value);
          }}
          onFocus={() => setCityFocus(true)}
          onBlur={() => setCityFocus(false)}
          noOptionsText={deliveryAdditionalInfo.noOneCity}
          onChange={(event, value) => {
            handleCity(value, setFieldValue, setPostOffice);
          }}
          disabled={!values.districtId}
          options={ukrPoshtaCities}
          inputValue={handleInputValue(cityFocus, city, values.city)}
          getOptionLabel={(option) => option?.CITY_UA || ''}
          className={styles.dataInput}
          renderInput={(params) => (
            <TextField
              {...params}
              label={deliveryLabels.city}
              variant={materialUiConstants.outlined}
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
          onInputChange={(e, value) => {
            setPostOffice(value);
          }}
          noOptionsText={deliveryAdditionalInfo.noOneDepartment}
          onChange={(event, value) => {
            handlePostOffice(value, setPostOffice, setFieldValue);
          }}
          onFocus={() => setDepartmentFocus(true)}
          onBlur={() => setDepartmentFocus(false)}
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
          className={styles.dataInput}
          renderInput={(params) => (
            <TextField
              {...params}
              label={deliveryLabels.department}
              variant={materialUiConstants.outlined}
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
