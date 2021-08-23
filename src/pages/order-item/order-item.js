import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Paper, Tabs, Tab, Grid } from '@material-ui/core';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import { config } from '../../configs';
import { useStyles } from './order-item.styles';
import TabPanel from '../../components/tab-panel';
import { Delivery, Recipient, Products, General } from './tabs';
import { getOrder } from '../../redux/orders/orders.actions';
import LoadingBar from '../../components/loading-bar';
import useSuccessSnackbar from '../../utils/use-success-snackbar';
import buttonTitles from '../../configs/button-titles';
import labels from '../../configs/labels';
import { BackButton, SaveButton } from '../../components/buttons';
import { submitStatus, initialValues, setFormValues } from '../../utils/order';
import { validationSchema } from '../../validations/orders/order-form-validation';
import { handleOrderSubmition } from '../../utils/handle-orders-page';

const OrderItem = ({ id }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { pathToOrders } = config.routes;
  const { orderTabs } = labels;
  const { materialUiConstants } = config;
  const { SAVE_TITLE } = buttonTitles;
  const { delivery, general, products, receiver } = orderTabs;
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
    handleOrderSubmition(dispatch, resetForm, openSuccessSnackbar, data, id);
    setTabValue(0);
  };

  const {
    handleChange,
    values,
    handleSubmit,
    setFieldValue,
    dirty,
    resetForm,
    isValid
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleFormSubmit
  });

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
      <div className={classes.controlsBlock}>
        <div className={classes.buttonContainer}>
          <Grid container spacing={2} className={classes.fixedButtons}>
            <Grid item className={classes.button}>
              <BackButton pathBack={pathToOrders} />
            </Grid>
            <Grid item className={classes.button}>
              <SaveButton
                type={materialUiConstants.types.submit}
                title={SAVE_TITLE}
                values={{
                  code: values.code,
                  uaTitle: values.uaTitle,
                  enTitle: values.enTitle
                }}
                disabled={!dirty || !isValid}
              />
            </Grid>
          </Grid>
        </div>
      </div>
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
            data={{
              recipient: values.recipient,
              userComment: values.userComment
            }}
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
