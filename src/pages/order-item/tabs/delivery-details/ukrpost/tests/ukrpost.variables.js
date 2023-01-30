import { config } from '../../../../../../configs';
import { inputName } from '../../../../../../utils/order';

const { ERROR_MESSAGE } = config.commonErrorMessages;

export const props = {
  values: {
    region: '',
    regionId: '',
    district: '',
    districtId: '',
    city: '',
    cityId: '',
    courierOffice: ''
  }
};

export const inputOptions = {
  touched: {},
  errors: {}
};

export const errorInputOptions = {
  touched: {
    [inputName.ukrPost.city]: true,
    [inputName.ukrPost.courierOffice]: true
  },
  errors: {
    [inputName.ukrPost.city]: ERROR_MESSAGE,
    [inputName.ukrPost.courierOffice]: ERROR_MESSAGE
  }
};
