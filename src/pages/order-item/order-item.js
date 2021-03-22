import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Paper, Tabs, Tab, Button } from '@material-ui/core';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import { noop } from 'lodash';

import { useStyles } from './order-item.styles';
import TabPanel from '../../components/tab-panel';
import { Delivery, Recipient, Products, General } from './tabs';
import {
  addOrder,
  getOrder,
  updateOrder
} from '../../redux/orders/orders.actions';
import LoadingBar from '../../components/loading-bar';
import { closeDialog } from '../../redux/dialog-window/dialog-window.actions';
import useSuccessSnackbar from '../../utils/use-success-snackbar';
import orders from '../../configs/orders';
import buttonTitles from '../../configs/button-titles';
import labels from '../../configs/labels';
import { BackButton } from '../../components/buttons';
import {
  newOrder,
  submitStatus,
  initialValues,
  setFormValues
} from '../../utils/order';

const OrderItem = ({ id }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { orderTabs } = labels;
  const { delivery, general, products, receiver } = orderTabs;
  const { dialogContent, buttonTitle } = orders;
  const { SAVE_ORDER } = buttonTitles;
  const [tabValue, setTabValue] = useState(0);
  const { openSuccessSnackbar } = useSuccessSnackbar();
  const { selectedOrder, orderLoading } = useSelector(({ Orders }) => ({
    selectedOrder: Orders.selectedOrder,
    orderLoading: Orders.orderLoading
  }));

  useEffect(() => {
    id && dispatch(getOrder(id));
  }, [dispatch, id]);

  const handleTabChange = (e, newValue) => {
    setTabValue(newValue);
  };

  const handleFormSubmit = (data) => {
    if (
      newOrder.status !== initialValues.status &&
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
      openSuccessSnackbar(updateOrderSnackbar, dialogContent, buttonTitle);
    } else if (id) {
      dispatch(updateOrder(newOrder(data), id));
    } else {
      dispatch(addOrder(newOrder(data)));
      resetForm({ values: initialValues });
    }
    setTabValue(0);
  };

  const {
    handleChange,
    values,
    handleSubmit,
    setFieldValue,
    dirty,
    resetForm
  } = useFormik({
    initialValues,
    onSubmit: handleFormSubmit
  });
  console.log(values);
  useEffect(() => {
    if (selectedOrder && id) {
      resetForm({ values: setFormValues(selectedOrder) });
    }
  }, [selectedOrder, resetForm]);

  const formikHandleChange =
    submitStatus.includes(selectedOrder && selectedOrder.status) || !id
      ? handleChange
      : noop;

  if (orderLoading) {
    return <LoadingBar />;
  }

  return (
    <form onSubmit={handleSubmit} className={classes.orderContainer}>
      <Paper>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab value={0} label={general} />
          <Tab value={1} label={receiver} />
          <Tab value={2} label={products} />
          <Tab value={3} label={delivery} />
        </Tabs>
        <TabPanel value={tabValue} index={0}>
          <General data={values} handleChange={formikHandleChange} />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <Recipient
            data={{ user: values.user, userComment: values.userComment }}
            handleChange={formikHandleChange}
          />
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <Products
            data={{ items: values.items }}
            setFieldValue={setFieldValue}
          />
        </TabPanel>
        <TabPanel value={tabValue} index={3}>
          <Delivery
            data={{ delivery: values.delivery }}
            handleChange={formikHandleChange}
            setFieldValue={setFieldValue}
          />
        </TabPanel>
      </Paper>
      <Button
        type='submit'
        variant='contained'
        color='primary'
        className={classes.saveBtn}
        disabled={!dirty}
      >
        {SAVE_ORDER}
      </Button>
      <div className={classes.controlsBlock}>
        <BackButton />
      </div>
    </form>
  );
};

OrderItem.defaultProps = {
  id: ''
};

OrderItem.propTypes = {
  id: PropTypes.string
};

export default OrderItem;
