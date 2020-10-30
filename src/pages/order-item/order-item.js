import React, { useEffect, useState } from 'react';
import { useStyles } from './order-item.styles';
import { useDispatch, useSelector } from 'react-redux';
import TabPanel from '../../components/tab-panel';
import { Paper, Tabs, Tab, Button } from '@material-ui/core';
import {Delivery,Recipient,Products,General} from './tabs'
import {getOrder,updateOrder} from '../../redux/orders/orders.actions'
import { useFormik } from 'formik';
import LoadingBar from '../../components/loading-bar';
import { closeDialog } from '../../redux/dialog-window/dialog-window.actions';
import useSuccessSnackbar from '../../utils/use-success-snackbar';
import orders from '../../configs/orders';
import buttonTitles from '../../configs/button-titles';

const OrderItem = ({ id }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {buttonTitle,dialogTitle,dialogContent} = orders
  const {SAVE_ORDER} = buttonTitles
  const [tabValue, setTabValue] = useState(0);
  const { openSuccessSnackbar } = useSuccessSnackbar();
  const { selectedOrder, orderLoading } = useSelector(
    ({ Orders }) => ({
      selectedOrder: Orders.selectedOrder,
      orderLoading: Orders.orderLoading,
    })
  );

  const handleTabChange = (e, newValue) => {
    setTabValue(newValue);
  };

  const handleFormSubmit = (order)=> {
    if(order.status!==initialValues.status&&!['CREATED','CONFIRMED'].includes(order.status)) {
      const updateOrderSnackbar = () => {
        dispatch(closeDialog());
        dispatch(updateOrder(order))
      };
      openSuccessSnackbar(
        updateOrderSnackbar,
        dialogTitle,
        dialogContent,
        buttonTitle,
        false
      );
    } else {
      dispatch(updateOrder(order))
    }
  }

  const {handleChange,values, handleSubmit, setFieldValue, dirty, initialValues, resetForm} = useFormik({
    initialValues: {},
    onSubmit: handleFormSubmit,
  })

  useEffect(() => {
    if(id) {
      dispatch(getOrder(id))
    }
  }, [dispatch,id]);

  useEffect(()=> {
    if(selectedOrder) {
      resetForm({ values: selectedOrder });
    }
  },[selectedOrder,resetForm])

  const formikHandleChange = ['CREATED','CONFIRMED'].includes(selectedOrder && selectedOrder.status) ? handleChange : ()=> {}

  if(orderLoading) {
    return <LoadingBar />
  }

  return (
    <form onSubmit={handleSubmit} className={classes.orderContainer}>
      <Paper>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab value={0} label="Загальне"/>
          <Tab value={1} label="Отримувач"/>
          <Tab value={2} label="Продукти"/>
          <Tab value={3} label="Доставка"/>
        </Tabs>
        <TabPanel value={tabValue} index={0}>
          <General data={values} handleChange={formikHandleChange}/>
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <Recipient data={{user: values.user, userComment: values.userComment }} handleChange={formikHandleChange}/>
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <Products data={{items:values.items}} setFieldValue={setFieldValue} />
        </TabPanel>
        <TabPanel value={tabValue} index={3}>
          <Delivery data={{delivery: values.delivery,address: values.address}} handleChange={formikHandleChange}/>
        </TabPanel>
      </Paper>
      {dirty && <Button
        type='submit'
        variant='contained'
        color='primary'
        className={classes.saveBtn}
      >
        {SAVE_ORDER}
      </Button>}
    </form>
  );
};

export default OrderItem;
