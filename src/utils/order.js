import PropTypes from 'prop-types';
import { MenuItem } from '@material-ui/core';
import React from 'react';
import _ from 'lodash';
import { config as configs } from '../configs';
import config from '../configs/orders';

export const recipientPropTypes = {
  data: PropTypes.shape({
    recipient: PropTypes.objectOf(PropTypes.string),
    userComment: PropTypes.string
  }),
  handleChange: PropTypes.func.isRequired
};

export const registeredUserPropTypes = {
  data: PropTypes.shape({
    user_id: PropTypes.objectOf(PropTypes.string)
  }),
  setFieldValue: PropTypes.func.isRequired
};

export const productsPropTypes = {
  data: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.object)
  }),
  setFieldValue: PropTypes.func.isRequired
};

export const generalPropTypes = {
  data: PropTypes.shape({
    status: PropTypes.string,
    isPaid: PropTypes.bool,
    courierOffice: PropTypes.string,
    paymentMethod: PropTypes.string,
    paymentStatus: PropTypes.arrayOf(PropTypes.string),
    city: PropTypes.string,
    street: PropTypes.string
  }),
  handleChange: PropTypes.func.isRequired
};

export const deliveryPropTypes = {
  data: PropTypes.shape({
    delivery: PropTypes.shape({
      courier: PropTypes.objectOf(PropTypes.string),
      novaPost: PropTypes.objectOf(PropTypes.string),
      ukrPost: PropTypes.objectOf(PropTypes.string),
      sentBy: PropTypes.string
    })
  }),
  handleChange: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired
};

const SizePropTypes = {
  _id: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number
};

const itemPropType = PropTypes.shape({
  options: PropTypes.shape({
    size: PropTypes.shape(SizePropTypes)
  }),
  quantity: PropTypes.number,
  product: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
    basePrice: PropTypes.number
  })
});

export const addProductFormPropTypes = {
  items: PropTypes.arrayOf(itemPropType),
  setFieldValue: PropTypes.func.isRequired
};

export const editProductFormPropTypes = {
  ...addProductFormPropTypes,
  open: PropTypes.bool.isRequired,
  onCloseHandler: PropTypes.func.isRequired,
  selectedItem: itemPropType
};

export const courierPropTypes = {
  deliveryType: PropTypes.string.isRequired,
  values: PropTypes.objectOf(PropTypes.string).isRequired,
  handleChange: PropTypes.func.isRequired
};

export const postPropTypes = {
  setFieldValue: PropTypes.func.isRequired,
  values: PropTypes.shape({
    city: PropTypes.string,
    courierOffice: PropTypes.string
  }).isRequired
};

export const worldWidePropTypes = {
  setFieldValue: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  values: PropTypes.shape({
    worldWideCountry: PropTypes.string,
    stateOrProvince: PropTypes.string,
    worldWideCity: PropTypes.string,
    worldWideStreet: PropTypes.string,
    cityCode: PropTypes.string
  })
};

const { deliveryTypes } = config;
const items = (order) =>
  order.items?.map((item) => ({
    product: item?.product._id,
    quantity: item.quantity,
    isFromConstructor: !item.product._id,
    options: {
      size: item.options.size._id,
      sidePocket: item.options.sidePocket
    }
  }));

export const newOrder = (order) => ({
  status: order.status,
  recipient: order.recipient,
  user_id: order.user_id,
  delivery: address(order.delivery),
  items: items(order),
  paymentMethod: order.paymentMethod,
  userComment: order.userComment,
  isPaid: order.isPaid
});

export const submitStatus = ['CREATED', 'CONFIRMED'];

const handleOrderItem = (item) => item || '';

export const address = (delivery) => {
  const { sentBy } = delivery;
  if (
    sentBy === deliveryTypes.ukrPostCourier ||
    sentBy === deliveryTypes.novaPostCourier
  ) {
    delivery.ukrPost = {};
    delivery.novaPost = {};
  } else if (sentBy === deliveryTypes.novaPost) {
    delivery.courier = {};
    delivery.ukrPost = {};
  } else {
    delivery.novaPost = {};
    delivery.courier = {};
    delivery.ukrPost = {};
  }
  return {
    sentBy,
    courierOffice:
      delivery.novaPost.courierOffice || delivery.ukrPost.courierOffice || '',
    region: handleOrderItem(delivery.ukrPost.region),
    regionId: handleOrderItem(delivery.ukrPost.regionId),
    district: handleOrderItem(delivery.ukrPost.district),
    districtId: handleOrderItem(delivery.ukrPost.districtId),
    city:
      delivery.novaPost.city ||
      delivery.ukrPost.city ||
      delivery.courier.city ||
      '',
    cityId: handleOrderItem(delivery.ukrPost.cityId),
    street: handleOrderItem(delivery.courier.street),
    house: handleOrderItem(delivery.courier.house),
    flat: handleOrderItem(delivery.courier.flat),
    messenger: handleOrderItem(delivery.worldWide.messenger),
    messengerPhone: handleOrderItem(delivery.worldWide.messengerPhone),
    worldWideCountry: handleOrderItem(delivery.worldWide.worldWideCountry),
    stateOrProvince: handleOrderItem(delivery.worldWide.stateOrProvince),
    worldWideCity: handleOrderItem(delivery.worldWide.worldWideCity),
    worldWideStreet: handleOrderItem(delivery.worldWide.worldWideStreet),
    cityCode: handleOrderItem(delivery.worldWide.cityCode),
    byCourier: delivery.sentBy.includes(COURIER)
  };
};

export const inputName = {
  sentByInput: 'delivery.sentBy',
  courier: {
    city: 'delivery.courier.city',
    street: 'delivery.courier.street',
    house: 'delivery.courier.house',
    flat: 'delivery.courier.flat'
  },
  novaPost: {
    city: 'delivery.novaPost.city',
    courierOffice: 'delivery.novaPost.courierOffice'
  },
  ukrPost: {
    region: 'delivery.ukrPost.region',
    regionId: 'delivery.ukrPost.regionId',
    district: 'delivery.ukrPost.district',
    districtId: 'delivery.ukrPost.districtId',
    city: 'delivery.ukrPost.city',
    cityId: 'delivery.ukrPost.cityId',
    courierOffice: 'delivery.ukrPost.courierOffice'
  },
  worldWide: {
    messenger: 'delivery.worldWide.messenger',
    messengerPhone: 'delivery.worldWide.messengerPhone',
    worldWideCountry: 'delivery.worldWide.worldWideCountry',
    stateOrProvince: 'delivery.worldWide.stateOrProvince',
    worldWideCity: 'delivery.worldWide.worldWideCity',
    worldWideStreet: 'delivery.worldWide.worldWideStreet',
    cityCode: 'delivery.worldWide.cityCode'
  },
  userId: 'user_id',
  noUser: 'Користувача не вибрано',
  isPaidInput: 'isPaid',
  itemsName: 'items',
  status: 'status',
  userComment: 'userComment',
  paymentMethod: 'paymentMethod',
  sentBy: 'sentBy'
};

export const initialValues = {
  status: '',
  paymentMethod: '',
  isPaid: false,
  recipient: {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: ''
  },
  user_id: '',
  delivery: {
    sentBy: deliveryTypes.selfPickUp,
    courier: {
      city: '',
      street: '',
      house: '',
      flat: ''
    },
    novaPost: {
      city: '',
      courierOffice: ''
    },
    ukrPost: {
      region: '',
      regionId: '',
      district: '',
      districtId: '',
      city: '',
      cityId: '',
      courierOffice: ''
    },
    worldWide: {
      messenger: '',
      messengerPhone: '',
      worldWideCountry: '',
      stateOrProvince: '',
      worldWideCity: '',
      worldWideStreet: '',
      cityCode: ''
    }
  },
  userComment: '',
  items: []
};

export const courierInputLabels = () => {
  const { city, street, house, flat } = inputName.courier;
  return [
    {
      name: city,
      label: 'Місто',
      value: 'city'
    },
    {
      name: street,
      label: 'Вулиця',
      value: 'street'
    },
    {
      name: house,
      label: 'Будинок',
      value: 'house'
    },
    {
      name: flat,
      label: 'Квартира',
      value: 'flat'
    }
  ];
};

export const POSTOMAT = 'Поштомат';
export const POST_OFFICE_NUMBER = 'Відділення № ';

const COURIER = 'COURIER';
export const setFormValues = (selectedOrder) => {
  const {
    sentBy,
    city,
    flat,
    house,
    street,
    courierOffice,
    district,
    region,
    regionId,
    districtId,
    cityId,
    messenger,
    messengerPhone,
    worldWideCountry,
    stateOrProvince,
    worldWideCity,
    worldWideStreet,
    cityCode
  } = selectedOrder.delivery;

  let worldWide = {
    messenger: '',
    messengerPhone: '',
    worldWideCountry: '',
    stateOrProvince: '',
    worldWideCity: '',
    worldWideStreet: '',
    cityCode: ''
  };

  if (sentBy === deliveryTypes.worldWide) {
    worldWide = {
      messenger,
      messengerPhone,
      worldWideCountry,
      stateOrProvince,
      worldWideCity,
      worldWideStreet,
      cityCode
    };
  }

  return {
    status: selectedOrder.status,
    paymentMethod: selectedOrder.paymentMethod,
    isPaid: selectedOrder.isPaid,
    recipient: selectedOrder.recipient,
    user_id: selectedOrder.user_id,
    delivery: {
      sentBy,
      courier: {
        city: sentBy.includes(COURIER) ? city : '',
        street: sentBy.includes(COURIER) ? street : '',
        house: sentBy.includes(COURIER) ? house : '',
        flat: sentBy.includes(COURIER) ? flat : ''
      },
      novaPost: {
        city: sentBy === deliveryTypes.novaPost ? city : '',
        courierOffice: sentBy === deliveryTypes.novaPost ? courierOffice : ''
      },
      ukrPost: {
        region: sentBy === deliveryTypes.ukrPost ? region : '',
        regionId: sentBy === deliveryTypes.ukrPost ? regionId : '',
        district: sentBy === deliveryTypes.ukrPost ? district : '',
        districtId: sentBy === deliveryTypes.ukrPost ? districtId : '',
        city: sentBy === deliveryTypes.ukrPost ? city : '',
        cityId: sentBy === deliveryTypes.ukrPost ? cityId : '',
        courierOffice: sentBy === deliveryTypes.ukrPost ? courierOffice : ''
      },
      worldWide
    },
    userComment: selectedOrder.userComment,
    items: selectedOrder.items.map((item) => ({
      options: {
        size: {
          _id: item.options.size._id,
          name: item.options.size.name,
          price: item.fixedPrice
        }
      },
      product: {
        _id: item.product._id,
        name: item.product.name,
        basePrice: item.product.basePrice
      },
      quantity: item.quantity
    }))
  };
};

export const mergeProducts = (selectedProduct, size, quantity, orderItems) => {
  const index = orderItems.findIndex(
    (item) =>
      item.product._id === selectedProduct._id &&
      item.options.size._id === size.id
  );
  if (index !== -1) {
    const newItem = { ...orderItems[index] };
    newItem.quantity += quantity;
    return [
      ...orderItems.slice(0, index),
      newItem,
      ...orderItems.slice(index + 1)
    ];
  }
  return [
    ...orderItems,
    {
      options: {
        size: { _id: size.id, name: size.name, price: size.price }
      },
      product: {
        basePrice: selectedProduct.basePrice,
        name: selectedProduct.name,
        _id: selectedProduct._id
      },
      quantity
    }
  ];
};

export const statusList = configs.labels.orders.select.map(
  ({ label, value }) => (
    <MenuItem key={value} value={value}>
      {label}
    </MenuItem>
  )
);
export const statusFilterObject = configs.labels.orders.select.map(
  ({ value, label }) => ({
    key: value,
    value: label
  })
);

export const paymentStatusFilterObj = () => {
  const arrToFilter = [];

  _.forEach(config.paymentStatusTranslation, (value, key) => {
    arrToFilter.push({ value: key, label: value });
  });

  return arrToFilter;
};
