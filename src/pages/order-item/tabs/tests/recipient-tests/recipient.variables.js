import { config } from '../../../../../configs';
import { inputName } from '../../../../../utils/order';

const { ERROR_MESSAGE } = config.commonErrorMessages;

export const props = {
  data: {
    recipient: {
      email: 'test@gmail.com',
      firstName: 'test',
      lastName: 'test',
      phoneNumber: '333333333'
    },
    userComment: 'test comment'
  }
};

export const inputOptions = {
  touched: {},
  errors: {}
};

export const errorInputOptions = {
  touched: {
    [inputName.recipient.email]: true,
    [inputName.recipient.firstName]: true,
    [inputName.recipient.lastName]: true,
    [inputName.recipient.phoneNumber]: true,
    [inputName.userComment]: true
  },
  errors: {
    [inputName.recipient.email]: ERROR_MESSAGE,
    [inputName.recipient.firstName]: ERROR_MESSAGE,
    [inputName.recipient.lastName]: ERROR_MESSAGE,
    [inputName.recipient.phoneNumber]: ERROR_MESSAGE,
    [inputName.userComment]: ERROR_MESSAGE
  }
};
