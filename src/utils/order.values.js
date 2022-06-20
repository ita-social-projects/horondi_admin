import config from '../configs/orders';

const { deliveryTypes } = config;

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
      region: '',
      district: '',
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
