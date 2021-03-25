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
  handleRegion
} from '../../../../../utils/handle-orders-page';

const UkrPost = ({ values, setFieldValue }) => {
  const { materialUiConstants } = config;
  const { deliveryTitles, deliveryAdditionalInfo, deliveryLabels } = configs;

  const dispatch = useDispatch();
  const styles = useStyles();

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

  const [regionId, setRegionId] = useState('');
  const [region, setRegion] = useState('');
  const [districtId, setDistrictId] = useState('');
  const [district, setDistrict] = useState('');
  const [cityId, setCityId] = useState('');
  const [city, setCity] = useState('');
  const [postOffice, setPostOffice] = useState('');

  useEffect(() => {
    if (regionId) {
      dispatch(getUkrPostDistricts(regionId));
    }
  }, [dispatch, regionId]);

  useEffect(() => {
    if (districtId) {
      dispatch(getUkrPostCities(districtId));
    }
  }, [dispatch, districtId]);

  useEffect(() => {
    if (cityId) {
      dispatch(getUkrPostPostOffices(cityId));
    }
  }, [dispatch, cityId]);

  return (
    <div>
      <h3 className={styles.ukrPostTitle}>{deliveryTitles.ukrPost}</h3>
      <div className={styles.selectorInfo}>
        <Autocomplete
          onInputChange={(e, value) => {
            setRegion(value);
          }}
          noOptionsText={deliveryAdditionalInfo.noOneRegion}
          onChange={(event, value) => {
            handleRegion(
              value,
              setRegionId,
              setFieldValue,
              setRegion,
              setDistrict,
              setCity,
              setPostOffice
            );
          }}
          options={ukrPoshtaRegions}
          inputValue={region}
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
          noOptionsText={deliveryAdditionalInfo.noOneDistrict}
          onChange={(event, value) => {
            handleDistrict(
              value,
              setFieldValue,
              setDistrictId,
              setCity,
              setPostOffice
            );
          }}
          disabled={!region}
          options={ukrPoshtaDistricts}
          inputValue={district}
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
            handleCity(value, setCityId, setFieldValue, setPostOffice);
          }}
          disabled={!district}
          options={ukrPoshtaCities}
          inputValue={cityFocus ? city : values.city}
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
          disabled={!city}
          options={ukrPoshtaPostOffices}
          inputValue={departmentFocus ? postOffice : values.courierOffice}
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
