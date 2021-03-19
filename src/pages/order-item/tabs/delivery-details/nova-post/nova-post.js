import React, { useCallback, useEffect, useState } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import PropTypes from 'prop-types';

import { useStyles } from './nova-post.styles';
import config from '../../../../../configs/orders';
import {
  getNovaPoshtaCities,
  getNovaPoshtaWarehouse
} from '../../../../../redux/orders/orders.actions';
import { inputName, POSTOMAT } from '../../../../../utils/order';

const NovaPost = ({ setFieldValue, values, errors, touched }) => {
  const { deliveryTitles, deliveryAdditionalInfo, deliveryLabels } = config;
  const dispatch = useDispatch();
  const styles = useStyles();

  const { deliveryLoading, cities, warehouses } = useSelector(({ Orders }) => ({
    deliveryLoading: Orders.deliveryLoading,
    cities: Orders.cities,
    warehouses: Orders.warehouses
  }));

  const [inputValue, setInputValue] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [wareHouse, setWarehouse] = useState('');
  const [cityFocus, setCityFocus] = useState(false);
  const [departmentFocus, setDepartmentFocus] = useState(false);

  const getPostCities = useCallback(
    _.debounce((value) => {
      dispatch(getNovaPoshtaCities(value));
    }, 500),
    [dispatch, getNovaPoshtaCities]
  );
  useEffect(() => {
    if (selectedCity) {
      dispatch(getNovaPoshtaWarehouse(selectedCity));
    }
  }, [dispatch, selectedCity]);

  return (
    <div className={styles.novaPostContainer}>
      <h3 className={styles.novaPostTitle}>{deliveryTitles.novaPost}</h3>
      <div className={styles.novaPostData}>
        <div className={styles.selectorInfo}>
          <Autocomplete
            onFocus={() => setCityFocus(true)}
            onBlur={() => setCityFocus(false)}
            onInputChange={(e, value) => {
              setInputValue(value);
              getPostCities(value);
            }}
            noOptionsText={deliveryAdditionalInfo.noOneCity}
            onChange={(event, value) => {
              if (value) {
                setSelectedCity(value.description);
                setFieldValue(inputName.cityInput, value.description);
              } else {
                setSelectedCity('');
                setWarehouse('');
                setFieldValue(inputName.cityInput, '');
              }
            }}
            options={cities}
            inputValue={cityFocus ? inputValue : values.city}
            getOptionLabel={(option) => option?.description || null}
            className={styles.dataInput}
            renderInput={(params) => (
              <TextField
                {...params}
                // error={touched.city && !!errors.city}
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
          {/* {touched.city && errors.city && (
            <div data-cy={CY_CODE_ERR} className={styles.error}>
              {errors.city}
            </div>
          )} */}
        </div>
      </div>
      <div className={styles.novaPostData}>
        <div className={styles.selectorInfo}>
          <Autocomplete
            onInputChange={(event, value) => {
              setWarehouse(value);
            }}
            noOptionsText={deliveryAdditionalInfo.noOneDepartment}
            onChange={(event, value) => {
              if (value) {
                setFieldValue(inputName.officeInput, value.description);
              } else {
                setFieldValue(inputName.officeInput, '');
                setWarehouse('');
              }
            }}
            onFocus={() => setDepartmentFocus(true)}
            onBlur={() => setDepartmentFocus(false)}
            disabled={!selectedCity}
            options={_.filter(
              warehouses,
              (warehouseItem) => !warehouseItem.description.includes(POSTOMAT)
            )}
            inputValue={departmentFocus ? wareHouse : values.courierOffice}
            getOptionLabel={(option) => option?.description}
            className={styles.dataInput}
            renderInput={(params) => (
              <TextField
                {...params}
                // error={touched.courierOffice && !!errors.courierOffice}
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
          {/* {touched.courierOffice && errors.courierOffice && (
            <div data-cy={CY_CODE_ERR} className={styles.error}>
              {errors.courierOffice}
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

NovaPost.propTypes = {
  setFieldValue: PropTypes.func.isRequired,
  values: PropTypes.shape({
    city: PropTypes.string,
    courierOffice: PropTypes.string
  }).isRequired,
  errors: PropTypes.string.isRequired,
  touched: PropTypes.string.isRequired
};

export default NovaPost;
