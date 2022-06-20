import config from '../configs/orders';

const { deliveryTypes } = config;

const recipient = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: ''
};

const courier = {
  region: '',
  district: '',
  city: '',
  street: '',
  house: '',
  flat: ''
};

const ukrPost = {
  region: '',
  regionId: '',
  district: '',
  districtId: '',
  city: '',
  cityId: '',
  courierOffice: ''
};

const worldWide = {
  messenger: '',
  messengerPhone: '',
  worldWideCountry: '',
  stateOrProvince: '',
  worldWideCity: '',
  worldWideStreet: '',
  cityCode: ''
};

const novaPost = {
  city: '',
  courierOffice: ''
};

export const initialValues = {
  status: '',
  paymentMethod: '',
  isPaid: false,
  recipient,
  user_id: '',
  delivery: {
    sentBy: deliveryTypes.selfPickUp,
    novaPost,
    ukrPost,
    worldWide,
    courier
  },
  userComment: '',
  items: []
};
