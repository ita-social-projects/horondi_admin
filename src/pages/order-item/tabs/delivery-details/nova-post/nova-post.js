import React, { useCallback, useEffect, useState } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useDispatch, useSelector } from 'react-redux';
import { filter, debounce } from 'lodash';

import { config } from '../../../../../configs';
import { useStyles } from './nova-post.styles';
import configs from '../../../../../configs/orders';
import {
  getNovaPoshtaCities,
  getNovaPoshtaWarehouse
} from '../../../../../redux/orders/orders.actions';
import { inputName, POSTOMAT, postPropTypes } from '../../../../../utils/order';
import {
  isFieldError,
  getError
} from '../../../../../utils/form-error-validation';

const NovaPost = ({ setFieldValue, values, inputOptions }) => {
  const { materialUiConstants } = config;
  const { deliveryTitles, deliveryAdditionalInfo, deliveryLabels } = configs;
  const dispatch = useDispatch();
  const styles = useStyles();

  const { deliveryLoading, cities, warehouses } = useSelector(({ Orders }) => ({
    deliveryLoading: Orders.deliveryLoading,
    cities: Orders.cities,
    warehouses: Orders.warehouses
  }));

  const { handleBlur, touched, errors } = inputOptions;

  const [inputValue, setInputValue] = useState('');
  const [selectedCity, setSelectedCity] = useState(values.city);
  const [wareHouse, setWarehouse] = useState('');
  const [cityFocus, setCityFocus] = useState(false);
  const [departmentFocus, setDepartmentFocus] = useState(false);

  const getPostCities = useCallback(
    debounce((value) => {
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
            id={inputName.novaPost.city}
            onFocus={() => setCityFocus(true)}
            onBlur={(e) => {
              setCityFocus(false);
              handleBlur(e);
            }}
            onInputChange={(_e, value) => {
              setInputValue(value);
              getPostCities(value);
            }}
            noOptionsText={deliveryAdditionalInfo.noOneCity}
            onChange={(_event, value) => {
              if (value) {
                setSelectedCity(value.description);
                setFieldValue(inputName.novaPost.city, value.description);
                setFieldValue(inputName.novaPost.courierOffice, '');
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
                error={isFieldError(inputName.novaPost.city, errors, touched)}
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
          {isFieldError(inputName.novaPost.city, errors, touched) && (
            <div className={styles.error} data-testid={inputName.novaPost.city}>
              {getError(inputName.novaPost.city, errors)}
            </div>
          )}
        </div>
      </div>
      <div className={styles.novaPostData}>
        <div className={styles.selectorInfo}>
          <Autocomplete
            id={inputName.novaPost.courierOffice}
            onInputChange={(_event, value) => {
              setWarehouse(value);
            }}
            noOptionsText={deliveryAdditionalInfo.noOneDepartment}
            onChange={(_event, value) => {
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
            onBlur={(e) => {
              setDepartmentFocus(false);
              handleBlur(e);
            }}
            disabled={!selectedCity}
            options={filter(
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
                error={isFieldError(
                  inputName.novaPost.courierOffice,
                  errors,
                  touched
                )}
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
          {isFieldError(inputName.novaPost.courierOffice, errors, touched) && (
            <div
              className={styles.error}
              data-testid={inputName.novaPost.courierOffice}
            >
              {getError(inputName.novaPost.courierOffice, errors)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

NovaPost.propTypes = postPropTypes;

export default NovaPost;
