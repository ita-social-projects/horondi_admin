import { config } from '../../../../../../configs';
import { inputName } from '../../../../../../utils/order';

const { ERROR_MESSAGE } = config.commonErrorMessages;

export const props = {
  values: {
    city: '',
    courierOffice: ''
  }
};

export const inputOptions = {
  touched: {},
  errors: {}
};

export const errorInputOptions = {
  touched: {
    [inputName.novaPost.city]: true,
    [inputName.novaPost.courierOffice]: true
  },
  errors: {
    [inputName.novaPost.city]: ERROR_MESSAGE,
    [inputName.novaPost.courierOffice]: ERROR_MESSAGE
  }
};
