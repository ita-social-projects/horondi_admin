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
  delivery: order.delivery,
  items: items(order),
  paymentMethod: order.paymentMethod,
  userComment: order.userComment,
  isPaid: order.isPaid,
  paymentStatus: order.paymentStatus
});

export const submitStatus = ['CREATED', 'CONFIRMED'];

export const address = (delivery) => ({
  city: delivery.city,
  street: delivery.street,
  house: delivery.house,
  flat: delivery.flat
});

export const inputName = {
  sentByInput: 'delivery.sentBy',
  officeInput: 'delivery.courierOffice',
  costInput: 'delivery.cost[0].value',
  courierInput: 'delivery.byCourier',
  isPaidInput: 'isPaid',
  itemsName: 'items',
  cityInput: 'delivery.city'
};

export const courierInputLabels = () => [
  {
    name: 'delivery.city',
    label: 'Місто',
    value: 'city'
  },
  {
    name: 'delivery.street',
    label: 'Вулиця',
    value: 'street'
  },
  {
    name: 'delivery.house',
    label: 'Будинок',
    value: 'house'
  },
  {
    name: 'delivery.flat',
    label: 'Квартира',
    value: 'flat'
  }
];

export const POSTOMAT = 'Поштомат';
export const POST_OFFICE_NUMBER = 'Відділення № ';
