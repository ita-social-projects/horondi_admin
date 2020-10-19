import React, { useEffect, useState } from 'react';
import { useStyles } from './order-item.styles';
import { useDispatch } from 'react-redux';
import TabPanel from '../../components/tab-panel';
import { Paper, Tabs, Tab } from '@material-ui/core';
import {Delivery,Recipient,Products,General} from './tabs'
import {getOrder} from '../../redux/orders/orders.actions'
import { Field, Form, Formik, useFormik } from 'formik';
import {Button,Select,TextField,MenuItem} from '@material-ui/core'

const OrderItem = ({ id }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (e, newValue) => {
    setTabValue(newValue);
  };

  // useEffect(() => {
  //   if(id) {
  //     dispatch(getOrder(id))
  //   }
  // }, [id]);

  const initialValue = {
    "_id":"00532f09b355ceb74023100e",
    "status":"DELIVERED",
    "user":{
      "firstName":"Ерік",
      "lastName":"Арутюнянц",
      "patronymicName":"Іванович",
      "email":"ve6r4jmgn8@ukr.net",
      "phoneNumber":"380991115359"},
    "dateOfCreation":"1593943756186",
    "lastUpdatedDate":"1594375756186",
    "adminComment":"",
    "userComment":"Хотілось би отримати не пізніше тижня",
    "cancellationReason":"",
    "delivery":{
      "sentOn":"1594116556186",
      "sentBy":"Nova Poshta",
      "invoiceNumber":"1746185",
      "courierOffice":10,
      "byCourier":true,
      "cost":[
        {
          "currency":"UAH",
        "value":5000
        },
        {
          "currency":"USD",
          "value":180
        }
        ]
    },
    "address":{
      "country":"Україна",
      "region":"Львівська область",
      "city":"Золочів",
      "zipcode":"84386",
      "street":"Вулиця Святослава Хороброго",
      "buildingNumber":"257",
      "appartment":"43"
    },
    "items":[{"name":[{"lang":"uk","value":"Ролтоп жовтий 2"},{"lang":"en","value":"Rolltop Yellow 2"}]}],
    "totalItemsPrice":[
      {"currency":"UAH","value":155000},
      {"currency":"USD","value":5590}
      ],
    "totalPriceToPay":[{"currency":"UAH","value":160000},{"currency":"USD","value":5770}],
    "isPaid":true,
    "paymentMethod":"CARD"
  }


  const orderConfig = {
    general: {
      component: General,
      data: {
        _id:'',
        status: '',
        dateOfCreation:"1593943756186",
        lastUpdatedDate:"1594375756186",
        cancellationReason:"",
        isPaid: true,
        paymentMethod: 'CASH'
      }
    }
  }

  const initialValues = {
    _id:'12314123',
    status: 'CREATED',
    dateOfCreation:"1593943756186",
    lastUpdatedDate:"1594375756186",
    cancellationReason:"",
    isPaid: true,
    paymentMethod: 'CASH'
  }

  const {handleChange,values} = useFormik({
    initialValues,
    onSubmit: (val)=> console.log(val)
  })

  return (
    <div className={classes.orderContainer}>
      <Paper>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab value={0} label="General"/>
          <Tab value={1} label="Recipient"/>
          <Tab value={2} label="Products"/>
          <Tab value={3} label="Delivery"/>
        </Tabs>
        <TabPanel value={tabValue} index={0}>
          <General data={values} handleChange={handleChange}/>
        </TabPanel>

      </Paper>
      <Button
        type='submit'
        variant='contained'
        color='primary'
        className={classes.saveBtn}
      >
        Save form
      </Button>
    </div>
  );
};

export default OrderItem;
