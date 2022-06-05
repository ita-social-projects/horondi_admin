import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import TableContainerGenerator from '../containers/table-container-generator';
import { config } from '../configs';
import order from '../configs/orders';
import {
  newOrder,
  submitStatus,
  initialValues,
  inputName,
  POST_OFFICE_NUMBER
} from './order';
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

const { dialogContent, buttonTitle } = order;

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
    const updateOrderSnackbar = () => {
      dispatch(closeDialog());
      if (id) {
        dispatch(updateOrder(newOrder(data), id));
      } else {
        dispatch(addOrder(newOrder(data)));
        resetForm({ values: initialValues });
      }
    };

    setTimeout(() => {
      openSuccessSnackbar(updateOrderSnackbar, dialogContent, buttonTitle);
    }, 0);
  } else if (id) {
    dispatch(updateOrder(newOrder(data), id));
  } else {
    dispatch(addOrder(newOrder(data)));
    resetForm({ values: initialValues });
  }
};

export const handleCircularProgress = (loading) =>
  loading && <CircularProgress size={20} />;

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
    setFieldValue(inputName.ukrPost.district, '');
    setFieldValue(inputName.ukrPost.city, '');
    setFieldValue(inputName.ukrPost.courierOffice, '');
    setFieldValue(inputName.ukrPost.districtId, '');
    setFieldValue(inputName.ukrPost.cityId, '');
  } else {
    setRegion('');
    setDistrict('');
    setCity('');
    setPostOffice('');
    setFieldValue(inputName.ukrPost.region, '');
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
    setFieldValue(inputName.ukrPost.city, '');
    setFieldValue(inputName.ukrPost.courierOffice, '');
    setFieldValue(inputName.ukrPost.cityId, '');
  } else {
    setCity('');
    setPostOffice('');
    setFieldValue(inputName.ukrPost.district, '');
  }
};

export const handleCity = (value, setFieldValue, setPostOffice) => {
  if (value) {
    setFieldValue(inputName.ukrPost.city, value.CITY_UA);
    setFieldValue(inputName.ukrPost.cityId, value.CITY_ID);
    setFieldValue(inputName.ukrPost.courierOffice, '');
  } else {
    setPostOffice('');
    setFieldValue(inputName.ukrPost.city, '');
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
