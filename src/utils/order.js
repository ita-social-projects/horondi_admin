import config from '../configs/orders';

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
  user: order.user,
  delivery: address(order.delivery),
  items: items(order),
  paymentMethod: order.paymentMethod,
  userComment: order.userComment,
  isPaid: order.isPaid
});

export const submitStatus = ['CREATED', 'CONFIRMED'];

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
  }
  return {
    sentBy,
    courierOffice:
      delivery.novaPost.courierOffice || delivery.ukrPost.courierOffice || '',
    city:
      delivery.novaPost.city ||
      delivery.ukrPost.city ||
      delivery.courier.city ||
      '',
    street: delivery.courier.street || '',
    house: delivery.courier.house || '',
    flat: delivery.courier.flat || '',
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
    district: 'delivery.ukrPost.district',
    city: 'delivery.ukrPost.city',
    courierOffice: 'delivery.ukrPost.courierOffice'
  },
  isPaidInput: 'isPaid',
  itemsName: 'items',
  status: 'status'
};

export const initialValues = {
  status: '',
  paymentMethod: '',
  isPaid: false,
  user: {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: ''
  },
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
      district: '',
      city: '',
      courierOffice: ''
    }
  },
  userComment: '',
  items: []
};

// {
//   constructorBasics: null,
//   constructorBottom: null,
//   constructorFrontPocket: null,
//   constructorPattern: null,
//   isFromConstructor: false,
//   model: null,
//   fixedPrice: [{ currency: 'UAH', value: 332903 }],
//   options: {
//     sidePocket: false,
//     size: {
//       name: 'M',
//       _id: '604394cba7532c33dcb326d6'
//     }
//   },
//   product: {
//     basePrice: [{ currency: 'UAH', value: 194157 }],
//     _id: '605654c1158e2fdb53498406',
//     name: [{ lang: 'ua', value: 'Роллтоп червоний' }]
//   },
//   quantity: 1
// }

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
    courierOffice
  } = selectedOrder.delivery;
  return {
    status: selectedOrder.status,
    paymentMethod: selectedOrder.paymentMethod,
    isPaid: selectedOrder.isPaid,
    user: selectedOrder.user,
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
        region: '',
        district: '',
        city: sentBy === deliveryTypes.ukrPost ? city : '',
        courierOffice: sentBy === deliveryTypes.ukrPost ? courierOffice : ''
      }
    },
    userComment: selectedOrder.userComment,
    items: selectedOrder.items
  };
};

export const mergeProducts = (selectedProduct, size, quantity, items) => {
  const index = items.findIndex(
    (item) =>
      item.product._id === selectedProduct._id &&
      item.options.size._id === size._id
  );
  if (index !== -1) {
    const newItem = { ...items[index] };
    newItem.quantity += quantity;
    return [...items.slice(0, index), newItem, ...items.slice(index + 1)];
  }
  return [
    ...items,
    {
      options: {
        size
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
