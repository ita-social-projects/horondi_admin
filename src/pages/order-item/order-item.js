import React, { useEffect, useState } from 'react';
import { useStyles } from './order-item.styles';
import { useDispatch } from 'react-redux';
import TabPanel from '../../components/tab-panel';
import { Paper, Tabs, Tab } from '@material-ui/core';
import * as tabList from './tabs'
import {getOrder} from '../../redux/orders/orders.actions'
import {Form,Formik} from 'formik'

const OrderItem = ({ id }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (e, newValue) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    if(id) {
      dispatch(getOrder(id))
    }
  }, [id]);

  return (
    <div className={classes.orderContainer}>
      <Paper>
        <Tabs value={tabValue} onChange={handleTabChange} className={classes.tabs}>
          <Tab value={0} label="General"/>
          <Tab value={1} label="Recipient"/>
          <Tab value={2} label="Products"/>
          <Tab value={3} label="Delivery"/>
          <Tab value={4} label="Delivery address"/>
        </Tabs>
        {Object.values(tabList).map((Tab, index) => (
          <TabPanel value={tabValue} index={index} key={index}>
            <Tab/>
          </TabPanel>
        ))}
      </Paper>
    </div>
  );
};

export default OrderItem;
