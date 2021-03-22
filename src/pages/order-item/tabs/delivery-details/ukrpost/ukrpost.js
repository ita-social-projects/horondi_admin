import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';

import { useStyles } from './ukrpost.styles';
import {
  getUkrPostCities,
  getUkrPostDistricts,
  getUkrPostPostOffices,
  getUkrPostRegions
} from '../../../../../redux/orders/orders.actions';
import config from '../../../../../configs/orders';
import { inputName, POST_OFFICE_NUMBER } from '../../../../../utils/order';

const UkrPost = ({ values, setFieldValue }) => {
  const { deliveryTitles, deliveryAdditionalInfo, deliveryLabels } = config;

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
            if (value) {
              setRegionId(value.REGION_ID);
              setFieldValue(inputName.ukrPost.region, value.REGION_UA);
            } else {
              setRegion('');
              setDistrict('');
              setCity('');
              setPostOffice('');
              setFieldValue(inputName.ukrPost.region, '');
            }
          }}
          options={ukrPoshtaRegions}
          inputValue={region}
          getOptionLabel={(option) => option?.REGION_UA || ''}
          className={styles.dataInput}
          renderInput={(params) => (
            <TextField
              {...params}
              label={deliveryLabels.region}
              variant='outlined'
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {deliveryLoading && <CircularProgress size={20} />}
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
            if (value) {
              setFieldValue(inputName.ukrPost.district, value.DISTRICT_UA);
              setDistrictId(value.DISTRICT_ID);
            } else {
              setDistrictId('');
              setCity('');
              setPostOffice('');
              setFieldValue(inputName.ukrPost.district, '');
            }
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
              variant='outlined'
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {deliveryLoading && <CircularProgress size={20} />}
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
            if (value) {
              setCityId(value.CITY_ID);
              setFieldValue(inputName.ukrPost.city, value.CITY_UA);
            } else {
              setCityId('');
              setPostOffice('');
              setFieldValue(inputName.ukrPost.city, '');
            }
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
              variant='outlined'
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {deliveryLoading && <CircularProgress size={20} />}
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
            if (value) {
              setPostOffice(
                `${POST_OFFICE_NUMBER} ${value.POSTCODE}, ${
                  value.STREET_UA_VPZ || ''
                }`
              );
              setFieldValue(
                inputName.ukrPost.courierOffice,
                `${POST_OFFICE_NUMBER} ${value.POSTCODE}, ${
                  value.STREET_UA_VPZ || ''
                }`
              );
            } else {
              setPostOffice('');
              setFieldValue(inputName.ukrPost.courierOffice, '');
            }
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
              variant='outlined'
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {deliveryLoading && <CircularProgress size={20} />}
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

UkrPost.propTypes = {
  setFieldValue: PropTypes.func.isRequired,
  values: PropTypes.shape({
    city: PropTypes.string,
    courierOffice: PropTypes.string
  }).isRequired
};

export default UkrPost;
