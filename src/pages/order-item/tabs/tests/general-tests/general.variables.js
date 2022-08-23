import { config } from '../../../../../configs';
import { inputName } from '../../../../../utils/order';

const { ERROR_MESSAGE } = config.commonErrorMessages;

export const props = {
  data: {
    status: 'CREATED',
    isPaid: false,
    courierOffice: '',
    paymentMethod: 'CARD',
    paymentStatus: [],
    city: '',
    street: ''
  }
};

export const inputFields = {
  [inputName.paymentMethod]: props.data.paymentMethod,
  [inputName.status]: props.data.status
};

export const inputOptions = {
  touched: {},
  errors: {}
};

export const errorInputOptions = {
  touched: {
    [inputName.paymentMethod]: true,
    [inputName.status]: true
  },
  errors: {
    [inputName.paymentMethod]: ERROR_MESSAGE,
    [inputName.status]: ERROR_MESSAGE
  }
};
