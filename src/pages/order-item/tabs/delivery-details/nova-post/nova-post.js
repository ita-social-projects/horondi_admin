import React, { useCallback, useEffect, useState } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';

import { config } from '../../../../../configs';
import { useStyles } from './nova-post.styles';
import configs from '../../../../../configs/orders';
import {
  getNovaPoshtaCities,
  getNovaPoshtaWarehouse
} from '../../../../../redux/orders/orders.actions';
import { inputName, POSTOMAT, postPropTypes } from '../../../../../utils/order';

const NovaPost = ({ setFieldValue, values }) => {
  const { materialUiConstants } = config;
  const { deliveryTitles, deliveryAdditionalInfo, deliveryLabels } = configs;
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
    <div>
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
                setFieldValue(inputName.novaPost.city, value.description);
              } else {
                setSelectedCity('');
                setWarehouse('');
                setFieldValue(inputName.novaPost.city, '');
              }
            }}
            options={cities}
            inputValue={cityFocus ? inputValue : values.city}
            getOptionLabel={(option) => option?.description || null}
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
      <div className={styles.novaPostData}>
        <div className={styles.selectorInfo}>
          <Autocomplete
            onInputChange={(event, value) => {
              setWarehouse(value);
            }}
            noOptionsText={deliveryAdditionalInfo.noOneDepartment}
            onChange={(event, value) => {
              if (value) {
                setFieldValue(
                  inputName.novaPost.courierOffice,
                  value.description
                );
              } else {
                setFieldValue(inputName.novaPost.courierOffice, '');
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
                label={deliveryLabels.department}
                variant={materialUiConstants.outlined}
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
    </div>
  );
};

NovaPost.propTypes = postPropTypes;

export default NovaPost;
