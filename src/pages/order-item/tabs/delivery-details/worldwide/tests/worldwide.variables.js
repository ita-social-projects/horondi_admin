import { config } from '../../../../../../configs';
import { inputName } from '../../../../../../utils/order';

const { ERROR_MESSAGE } = config.commonErrorMessages;

export const props = {
  values: {
    worldWideCountry: '',
    stateOrProvince: '',
    worldWideCity: '',
    worldWideStreet: '',
    cityCode: ''
  }
};

export const inputOptions = {
  touched: {},
  errors: {}
};

export const errorInputOptions = {
  touched: {
    [inputName.worldWide.messenger]: true,
    [inputName.worldWide.messengerPhone]: true,
    [inputName.worldWide.worldWideCountry]: true,
    [inputName.worldWide.worldWideCity]: true,
    [inputName.worldWide.worldWideStreet]: true,
    [inputName.worldWide.cityCode]: true
  },
  errors: {
    [inputName.worldWide.messenger]: ERROR_MESSAGE,
    [inputName.worldWide.messengerPhone]: ERROR_MESSAGE,
    [inputName.worldWide.worldWideCountry]: ERROR_MESSAGE,
    [inputName.worldWide.worldWideCity]: ERROR_MESSAGE,
    [inputName.worldWide.worldWideStreet]: ERROR_MESSAGE,
    [inputName.worldWide.cityCode]: ERROR_MESSAGE
  }
};
