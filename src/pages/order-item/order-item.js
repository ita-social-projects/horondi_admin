import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Paper, Tabs, Tab, Button } from '@material-ui/core';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';

import { useStyles } from './order-item.styles';
import TabPanel from '../../components/tab-panel';
import { Delivery, Recipient, Products, General } from './tabs';
import { getOrder, updateOrder } from '../../redux/orders/orders.actions';
import LoadingBar from '../../components/loading-bar';
import { closeDialog } from '../../redux/dialog-window/dialog-window.actions';
import useSuccessSnackbar from '../../utils/use-success-snackbar';
import orders from '../../configs/orders';
import buttonTitles from '../../configs/button-titles';
import labels from '../../configs/labels';
import { BackButton } from '../../components/buttons';
import { newOrder, submitStatus } from '../../utils/order';

const OrderItem = ({ id }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { orderTabs } = labels;
  const { delivery, general, products, receiver } = orderTabs;
  const { dialogTitle, dialogContent } = orders;
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
        dispatch(updateOrder(newOrder(data), id));
      };
      openSuccessSnackbar(updateOrderSnackbar, dialogContent, dialogTitle);
    } else {
      dispatch(updateOrder(newOrder(data), id));
    }
  };

  const {
    handleChange,
    values,
    handleSubmit,
    setFieldValue,
    dirty,
    initialValues,
    resetForm
  } = useFormik({
    initialValues: {
      paymentStatus: '',
      paymentMethod: '',
      isPaid: false,
      user: {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: ''
      },
      delivery: { sentBy: 'SELFPICKUP' },
      userComment: '',
      items: []
    },
    onSubmit: handleFormSubmit
  });

  useEffect(() => console.log(values));
  useEffect(() => {
    if (selectedOrder && id) {
      resetForm({ values: selectedOrder });
    }
  }, [selectedOrder, resetForm]);

  const formikHandleChange = handleChange;

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
            data={{ delivery: values.delivery, address: values.address }}
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

OrderItem.propTypes = {
  id: PropTypes.string.isRequired
};

export default OrderItem;
