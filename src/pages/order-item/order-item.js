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

const OrderItem = ({ id }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
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
        dispatch(updateOrder({id,order}))
      };
      openSuccessSnackbar(
        updateOrderSnackbar,
        'Замовлення',
        'Зміна статусу "Замовлення створено" чи "Замовлення підтверджено" на інші унеможливить подальше редагування деталей замовлення. Ви дійсно хочете продовжити?',
        'Продовжити'
      );
    } else {
      dispatch(updateOrder({id,order}))
    }
  }

  const mockupData = {
    status: 'PRODUCED',
    dateOfCreation:"1593943756186",
    lastUpdatedDate:"1594375756186",
    cancellationReason:"",
    isPaid: true,
    paymentMethod: 'CASH',
    user: {
      firstName:"Ерік",
      lastName:"Арутюнянц",
      patronymicName:"Іванович",
      email:"ve6r4jmgn8@ukr.net",
      phoneNumber:"380991115359"
    },
    adminComment:"",
    userComment:"Хотілось би отримати не пізніше тижня",
    items: [
      {
        "category": [{
          "lang": "uk",
          "value": "Рюкзаки"
        }, {
          "lang": "en",
          "value": "Backpacks"
        }],
        "subcategory": [{
          "lang": "uk",
          "value": "Рюкзаки"
        }, {
          "lang": "en",
          "value": "Backpacks"
        }],
        "model": [{
          "lang": "uk",
          "value": "Ролтоп"
        }, {
          "lang": "en",
          "value": "Rolltop"
        }],
        "name": [{
          "lang": "uk",
          "value": "Ролтоп жовтий 2"
        }, {
          "lang": "en",
          "value": "Rolltop Yellow 2"
        }],
        "colors": [
          [{
            "lang": "uk",
            "value": "Золотий"
          }, {
            "lang": "en",
            "value": "Golden"
          }]
        ],
        "pattern": [{
          "lang": "uk",
          "value": "Олені"
        }, {
          "lang": "en",
          "value": "Deers"
        }],
        "closure": [{
          "lang": "uk",
          "value": "Фастекс (пластикова защіпка)"
        }, {
          "lang": "en",
          "value": "Plastic closure"
        }],
        "closureColor": "black",
        "size": {
          "heightInCm": 40,
          "widthInCm": 28,
          "depthInCm": 14,
          "volumeInLiters": 19,
          "weightInKg": 0.8
        },
        "bottomMaterial": [{
          "lang": "uk",
          "value": "Тканина Кордура"
        }, {
          "lang": "en",
          "value": "Cordura fabric"
        }],
        "bottomColor": [{
          "lang": "uk",
          "value": "чорний"
        }, {
          "lang": "en",
          "value": "black"
        }],
        "additions": [
          [{
            "lang": "uk",
            "value": "Кишеня"
          }, {
            "lang": "en",
            "value": "Pocket"
          }]
        ],
        "actualPrice": [{
          "currency": "UAH",
          "value": 155000
        }, {
          "currency": "USD",
          "value": 5590
        }],
        "quantity": 2
      }
    ],
    delivery: {
      sentOn: '1594116556186',
      sentBy: 'Nova Poshta',
      invoiceNumber: '1746185',
      courierOffice: 10,
      byCourier: true,
      cost: [
        {
          'currency': 'UAH',
          'value': 5000
        },
        {
          'currency': 'USD',
          'value': 180
        }
      ]
    },
    address: {
      country: 'Україна',
      region: 'Львівська область',
      city: 'Золочів',
      zipcode: '84386',
      street: 'Вулиця Святослава Хороброго',
      buildingNumber: '257',
      appartment: '43'
    },
    totalItemsPrice:[
      {
        currency:"UAH",
        value:155000
      },
      {
        currency:"USD",
        value:5590
      }
    ],
    totalPriceToPay:[
      {
        currency:"UAH",
        value:160000
      },
      {
        currency:"USD",
        value:5770
      }
    ],
  }

  const {handleChange,values, handleSubmit, setFieldValue, dirty, initialValues, resetForm} = useFormik({
    initialValues: mockupData,
    onSubmit: handleFormSubmit
  })

  useEffect(() => {
    if(id) {
      dispatch(getOrder(id))
    }
  }, [dispatch,id]);

  useEffect(()=> {
    resetForm({ values: selectedOrder });
  },[selectedOrder,resetForm])

  const formikHandleChange = ['CREATED','CONFIRMED'].includes(initialValues.status) ? handleChange : ()=> {}

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
        Зберегти замовлення
      </Button>}
    </form>
  );
};

export default OrderItem;
