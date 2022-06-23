import config from '../../configs/orders';

const { deliveryTypes } = config;

export const worldWideMock = {
  messenger: 'Telegram',
  messengerPhone: '0987654321',
  worldWideCountry: 'Ukraine',
  stateOrProvince: 'Lviv',
  worldWideCity: 'Lviv',
  worldWideStreet: 'dovbusha',
  cityCode: '68789'
};

export const novaPostMock = {
  city: 'Lviv',
  courierOffice: 'office 42'
};

export const ukrPostMock = {
  region: '',
  regionId: '',
  district: '',
  districtId: '',
  city: '',
  cityId: '',
  courierOffice: ''
};

export const courierMock = {
  region: '',
  district: '',
  city: '',
  street: '',
  house: '',
  flat: ''
};

export const selectedOrderMock = {
  items: [
    {
      options: { size: { _id: 'id', name: 'name' } },
      fixedPrice: 50,
      product: { _id: '_id', name: 'name', basePrice: 50 },
      quantity: 100
    }
  ]
};

export const deliveryMock = {
  sentBy: deliveryTypes.novaPost,
  courier: courierMock,
  novaPost: novaPostMock,
  ukrPost: ukrPostMock,
  worldWide: worldWideMock
};

export const setFormMock = {
  delivery: deliveryMock,
  status: 'test',
  paymentMethod: 'CARD',
  isPaid: 'isPaid',
  recipient: 'recipient',
  user_id: 'user_id',
  userComment: 'comment',
  items: selectedOrderMock.items
};
