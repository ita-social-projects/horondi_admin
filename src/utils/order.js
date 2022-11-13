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
    items: PropTypes.arrayOf(PropTypes.object),
    itemsPriceWithDiscount: PropTypes.arrayOf(PropTypes.number),
    promoCodeId: PropTypes.string,
    itemsDiscount: PropTypes.arrayOf(PropTypes.number)
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
  setFieldValue: PropTypes.func.isRequired,
  promoCode: PropTypes.objectOf(PropTypes.object)
};

export const editProductFormPropTypes = {
  ...addProductFormPropTypes,
  open: PropTypes.bool.isRequired,
  onCloseHandler: PropTypes.func.isRequired,
  selectedItem: itemPropType,
  setSizeItems: PropTypes.func
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
  user_id: order.user_id || null,
  delivery: address(order.delivery),
  items: items(order),
  paymentMethod: order.paymentMethod,
  userComment: order.userComment,
  isPaid: order.isPaid,
  promoCodeId: order.promoCodeId
});

export const submitStatus = ['CREATED', 'CONFIRMED'];

export const handleOrderItem = (item) => item || '';

export const address = (delivery) => {
  const { sentBy } = delivery;
  if (
    sentBy === deliveryTypes.ukrPostCourier ||
    sentBy === deliveryTypes.novaPostCourier ||
    sentBy === deliveryTypes.selfPickUp ||
    sentBy === deliveryTypes.worldWide
  ) {
    delivery.ukrPost = {};
    delivery.novaPost = {};
  } else if (sentBy === deliveryTypes.novaPost) {
    delivery.courier = {};
    delivery.ukrPost = {};
  } else {
    delivery.novaPost = {};
    delivery.courier = {};
  }
  return {
    sentBy,
    courierOffice:
      delivery.novaPost.courierOffice || delivery.ukrPost.courierOffice || '',
    region: handleOrderItem(delivery.ukrPost.region || delivery.courier.region),
    regionId: handleOrderItem(delivery.ukrPost.regionId),
    district: handleOrderItem(
      delivery.ukrPost.district || delivery.courier.district
    ),
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
    region: 'delivery.courier.region',
    district: 'delivery.courier.district',
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
  recipient: {
    email: 'recipient.email',
    firstName: 'recipient.firstName',
    lastName: 'recipient.lastName',
    phoneNumber: 'recipient.phoneNumber'
  },
  recipientBase: 'recipient',
  userId: 'user_id',
  noUser: 'Користувача не вибрано',
  isPaidInput: 'isPaid',
  items: 'items',
  itemsPriceWithDiscount: 'itemsPriceWithDiscount',
  itemsDiscount: 'itemsDiscount',
  categories: 'categories',
  status: 'status',
  userComment: 'userComment',
  paymentMethod: 'paymentMethod',
  sentBy: 'sentBy',
  promoCodeId: 'promoCodeId'
};

export const courierInputLabels = () => {
  const { region, district, city, street, house, flat } = inputName.courier;
  return [
    {
      name: region,
      label: 'Область',
      value: 'region'
    },
    {
      name: district,
      label: 'Район',
      value: 'district'
    },
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

  let novaPost = {
    city: '',
    courierOffice: ''
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

  if (sentBy === deliveryTypes.novaPost) {
    novaPost = { city, courierOffice };
  }
  const sendWithCourier = {
    region,
    district,
    city,
    street,
    house,
    flat
  };
  const sendWithoutCourier = {
    region: '',
    district: '',
    city: '',
    street: '',
    house: '',
    flat: ''
  };

  return {
    status: selectedOrder.status,
    paymentMethod: selectedOrder.paymentMethod,
    isPaid: selectedOrder.isPaid,
    recipient: selectedOrder.recipient,
    itemsPriceWithDiscount: selectedOrder.itemsPriceWithDiscount,
    itemsDiscount: selectedOrder.itemsDiscount,
    user_id: selectedOrder.user_id,
    promoCodeId: selectedOrder.promoCodeId,
    certificateId: selectedOrder.certificateId,
    delivery: {
      sentBy,
      courier: sentBy.includes(COURIER) ? sendWithCourier : sendWithoutCourier,
      novaPost,
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
          _id: item.options.size?._id,
          name: item.options.size?.name || config.size.deleted,
          price: item.fixedPrice
        }
      },
      product: {
        _id: item.product._id,
        name: item.product.name,
        basePrice: item.product.basePrice
      },
      model: item.model,
      quantity: item.quantity
    }))
  };
};

export const mergeProducts = (
  selectedProduct,
  size,
  quantity,
  orderItems,
  category,
  model,
  promoCode,
  setFieldValue,
  itemsDiscount,
  itemsPriceWithDiscount
) => {
  const index = orderItems.findIndex(
    (item) =>
      item.product._id === selectedProduct._id &&
      item.options.size._id === size.id
  );
  if (index !== -1) {
    const newItem = { ...orderItems[index] };
    newItem.quantity += quantity;
    setFieldValue(inputName.itemsPriceWithDiscount, [
      ...itemsPriceWithDiscount.slice(0, index),
      calculateItemsPriceWithDiscount(
        promoCode,
        newItem.quantity,
        category,
        size.price
      ),
      ...itemsPriceWithDiscount.slice(index + 1)
    ]);
    return [
      ...orderItems.slice(0, index),
      newItem,
      ...orderItems.slice(index + 1)
    ];
  }
  setFieldValue(inputName.itemsPriceWithDiscount, [
    ...itemsPriceWithDiscount,
    calculateItemsPriceWithDiscount(promoCode, quantity, category, size.price)
  ]);
  setFieldValue(inputName.itemsDiscount, [
    ...itemsDiscount,
    calculateDiscountsForProducts(promoCode, category)
  ]);
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
      model: { ...model, category },
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

export const calculateItemsPriceWithDiscount = (
  promoCode,
  quantity,
  category,
  price
) => {
  if (Object.keys(promoCode).length) {
    const { discount, categories } = promoCode.getPromoCodeById;
    const isAllowCategory = categories.find(
      (item) => item.toLowerCase() === category.name[1].value.toLowerCase()
    );
    if (isAllowCategory) {
      return Math.round(price - (price / 100) * discount) * quantity;
    }
  }
  return price * quantity;
};

export const calculateDiscountsForProducts = (promoCode, category) => {
  if (Object.keys(promoCode).length) {
    const { discount, categories } = promoCode.getPromoCodeById;
    const isAllowCategory = categories.find(
      (item) => item.toLowerCase() === category.name[1].value.toLowerCase()
    );
    if (isAllowCategory) {
      return discount;
    }
  }
  return 0;
};
