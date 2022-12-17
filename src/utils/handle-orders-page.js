import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import TableContainerGenerator from '../containers/table-container-generator';
import { config } from '../configs';
import { newOrder, submitStatus, inputName, POST_OFFICE_NUMBER } from './order';
import { initialValues } from './order.values';
import { addOrder, updateOrder } from '../redux/orders/orders.actions';
import { closeDialog } from '../redux/dialog-window/dialog-window.actions';

export const handleOrdersPage = (orders, itemsCount, orderItems, style) =>
  orders && orders.length ? (
    <TableContainerGenerator
      pagination
      count={itemsCount}
      tableTitles={config.tableHeadRowTitles.orders}
      tableItems={orderItems}
    />
  ) : (
    <p className={style}>{config.titles.orderTitles.ORDER_NOT_FOUND}</p>
  );

export const handleOrderSubmition = (
  dispatch,
  resetForm,
  openSuccessSnackbar,
  data,
  id
) => {
  if (
    newOrder(data).status !== initialValues.status &&
    !submitStatus.includes(newOrder(data).status)
  ) {
    dispatch(closeDialog());
    if (id) {
      dispatch(updateOrder(newOrder(data), id));
    } else {
      dispatch(addOrder(newOrder(data)));
      resetForm({ values: initialValues });
    }
  } else if (id) {
    dispatch(updateOrder(newOrder(data), id));
  } else {
    dispatch(addOrder(newOrder(data)));
    resetForm({ values: initialValues });
  }
};

export const handleCircularProgress = (loading) =>
  loading && <CircularProgress size={20} />;

export const handleCityNovaPost = (
  value,
  setSelectedCity,
  setWarehouse,
  setFieldValue
) => {
  if (value) {
    setSelectedCity(value.description);
    setFieldValue(inputName.novaPost.city, value.description);
    setFieldValue(inputName.novaPost.cityId, value.cityID);
  } else {
    setSelectedCity('');
    setWarehouse('');
    setFieldValue(inputName.novaPost.city, '');
    setFieldValue(inputName.novaPost.cityId, '');
  }
  setFieldValue(inputName.novaPost.courierOffice, '');
  setFieldValue(inputName.novaPost.courierOfficeId, '');
};

export const handleWarehousesNovaPost = (
  value,
  setFieldValue,
  setWarehouse
) => {
  if (value) {
    setFieldValue(inputName.novaPost.courierOffice, value.description);
    setFieldValue(inputName.novaPost.courierOfficeId, String(value.number));
    setWarehouse(value.description);
  } else {
    setFieldValue(inputName.novaPost.courierOffice, '');
    setFieldValue(inputName.novaPost.courierOfficeId, '');
    setWarehouse('');
  }
};

export const handleRegion = (
  value,
  setFieldValue,
  setRegion,
  setDistrict,
  setCity,
  setPostOffice
) => {
  if (value) {
    setFieldValue(inputName.ukrPost.region, value.REGION_UA);
    setFieldValue(inputName.ukrPost.regionId, value.REGION_ID);
  } else {
    setRegion('');
    setDistrict('');
    setCity('');
    setPostOffice('');
    setFieldValue(inputName.ukrPost.region, '');
    setFieldValue(inputName.ukrPost.district, '');
    setFieldValue(inputName.ukrPost.city, '');
    setFieldValue(inputName.ukrPost.cityId, '');
    setFieldValue(inputName.ukrPost.courierOffice, '');
    setFieldValue(inputName.ukrPost.districtId, '');
    setFieldValue(inputName.ukrPost.regionId, '');
  }
};

export const handleDistrict = (
  value,
  setFieldValue,
  setCity,
  setPostOffice
) => {
  if (value) {
    setFieldValue(inputName.ukrPost.district, value.DISTRICT_UA);
    setFieldValue(inputName.ukrPost.districtId, value.DISTRICT_ID);
  } else {
    setCity('');
    setPostOffice('');
    setFieldValue(inputName.ukrPost.district, '');
    setFieldValue(inputName.ukrPost.districtId, '');
    setFieldValue(inputName.ukrPost.city, '');
    setFieldValue(inputName.ukrPost.courierOffice, '');
    setFieldValue(inputName.ukrPost.cityId, '');
  }
};

export const handleCity = (value, setFieldValue, setPostOffice) => {
  if (value) {
    setFieldValue(inputName.ukrPost.city, value.CITY_UA);
    setFieldValue(inputName.ukrPost.cityId, value.CITY_ID);
  } else {
    setPostOffice('');
    setFieldValue(inputName.ukrPost.city, '');
    setFieldValue(inputName.ukrPost.cityId, '');
    setFieldValue(inputName.ukrPost.courierOffice, '');
  }
};

export const handlePostOffice = (value, setPostOffice, setFieldValue) => {
  if (value) {
    setPostOffice(
      `${POST_OFFICE_NUMBER} ${value.POSTCODE}, ${value.STREET_UA_VPZ || ''}`
    );
    setFieldValue(
      inputName.ukrPost.courierOffice,
      `${POST_OFFICE_NUMBER} ${value.POSTCODE}, ${value.STREET_UA_VPZ || ''}`
    );
  } else {
    setPostOffice('');
    setFieldValue(inputName.ukrPost.courierOffice, '');
  }
};

export const handleInputValue = (isFocused, focusedValue, bluredValue) =>
  isFocused ? focusedValue : bluredValue;

export const handleWorldWideCountry = (value, setFieldValue) => {
  if (value) {
    setFieldValue(inputName.worldWide.worldWideCountry, value);
  } else {
    setFieldValue(inputName.worldWide.worldWideCountry, '');
    setFieldValue(inputName.worldWide.stateOrProvince, '');
    setFieldValue(inputName.worldWide.stateOrProvince, '');
    setFieldValue(inputName.worldWide.worldWideCity, '');
    setFieldValue(inputName.worldWide.worldWideStreet, '');
    setFieldValue(inputName.worldWide.cityCode, '');
  }
};

export const handleStateOrProvince = (value, setFieldValue) => {
  if (value) {
    setFieldValue(inputName.worldWide.stateOrProvince, value);
  } else {
    setFieldValue(inputName.worldWide.stateOrProvince, '');
    setFieldValue(inputName.worldWide.worldWideCity, '');
    setFieldValue(inputName.worldWide.worldWideStreet, '');
    setFieldValue(inputName.worldWide.cityCode, '');
  }
};

export const handleWorldWideCity = (value, setFieldValue) => {
  if (value) {
    setFieldValue(inputName.worldWide.worldWideCity, value);
  } else {
    setFieldValue(inputName.worldWide.worldWideCity, '');
    setFieldValue(inputName.worldWide.worldWideStreet, '');
    setFieldValue(inputName.worldWide.cityCode, '');
  }
};
