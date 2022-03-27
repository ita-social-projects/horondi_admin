import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Paper, Tabs, Tab, Grid } from '@material-ui/core';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import { config } from '../../configs';
import { useStyles } from './order-item.styles';
import TabPanel from '../../components/tab-panel';
import { Delivery, RegisteredUser, Recipient, Products, General } from './tabs';
import { getOrder } from '../../redux/orders/orders.actions';
import LoadingBar from '../../components/loading-bar';
import useSuccessSnackbar from '../../utils/use-success-snackbar';
import buttonTitles from '../../configs/button-titles';
import labels from '../../configs/labels';
import { BackButton, SaveButton } from '../../components/buttons';
import { submitStatus, initialValues, setFormValues } from '../../utils/order';
import { validationSchema } from '../../validations/orders/order-form-validation';
import { handleOrderSubmition } from '../../utils/handle-orders-page';
import { checkInitialValue } from '../../utils/check-initial-values';

const OrderItem = ({ id }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { pathToOrders } = config.routes;
  const { orderTabs } = labels;
  const { materialUiConstants } = config;
  const { SAVE_TITLE } = buttonTitles;
  const { delivery, registeredUser, general, products, receiver } = orderTabs;
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

  const handleFormSubmit = () => {
    handleOrderSubmition(dispatch, resetForm, openSuccessSnackbar, values, id);
    setTabValue(0);
  };

  const { handleChange, values, setFieldValue, resetForm, isValid } = useFormik(
    {
      initialValues,
      validationSchema,
      onSubmit: handleFormSubmit
    }
  );

  useEffect(() => {
    if (selectedOrder && id) {
      resetForm({ values: setFormValues(selectedOrder) });
    }
  }, [selectedOrder, resetForm]);

  const valueEquality = selectedOrder
    ? checkInitialValue(setFormValues(selectedOrder), values)
    : true;

  const formikHandleChange =
    submitStatus.includes(selectedOrder && selectedOrder.status) || !id
      ? handleChange
      : noop;

  if (orderLoading) {
    return <LoadingBar />;
  }

  const eventPreventHandler = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={eventPreventHandler} className={classes.orderContainer}>
      <div className={classes.controlsBlock}>
        <div className={classes.buttonContainer}>
          <Grid container spacing={2} className={classes.fixedButtons}>
            <Grid item className={classes.button}>
              <BackButton initial={!valueEquality} pathBack={pathToOrders} />
            </Grid>
            <Grid item className={classes.button}>
              <SaveButton
                type={materialUiConstants.types.submit}
                title={SAVE_TITLE}
                onClickHandler={handleFormSubmit}
                values={{
                  code: values.code,
                  uaTitle: values.uaTitle,
                  enTitle: values.enTitle
                }}
                disabled={isValid}
              />
            </Grid>
          </Grid>
        </div>
      </div>
      <Paper>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab value={0} label={general} />
          <Tab value={1} label={registeredUser} />
          <Tab value={2} label={receiver} />
          <Tab value={3} label={products} />
          <Tab value={4} label={delivery} />
        </Tabs>
        <TabPanel value={tabValue} index={0}>
          <General data={values} handleChange={formikHandleChange} />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <RegisteredUser
            userId={values.user_id}
            setFieldValue={setFieldValue}
          />
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <Recipient
            data={{
              recipient: values.recipient,
              userComment: values.userComment
            }}
            handleChange={formikHandleChange}
          />
        </TabPanel>
        <TabPanel value={tabValue} index={3}>
          <Products
            data={{ items: values.items }}
            setFieldValue={setFieldValue}
          />
        </TabPanel>
        <TabPanel value={tabValue} index={4}>
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
