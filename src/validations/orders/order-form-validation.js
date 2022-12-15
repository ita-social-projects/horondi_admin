import * as Yup from 'yup';
import {
  phoneNumberRegex,
  userNameRegex,
  onlyNumbersRegex,
  phoneNumberWithoutLettersRegex
} from '../../configs/regexes';
import { inputName } from '../../utils/order';
import ordersConfig from '../../configs/orders';
import { config } from '../../configs';

const {
  MIN_LENGTH_MESSAGE,
  MAX_LENGTH_MESSAGE_500,
  ERROR_MESSAGE,
  NAME_MESSAGE
} = config.commonErrorMessages;
const { PHONE_NUMBER_TYPE_MESSAGE, INVALID_PHONE_MESSAGE } =
  config.contactErrorMessages;
const { MUST_BE_NUMBER } = config.paginationInputErrorMessages;
const { USER_INVALID_EMAIL_MESSAGE } = config.userErrorMessages;

const { deliveryTypes } = ordersConfig;

const postValidation = (type) =>
  Yup.object().when(inputName.sentBy, {
    is: type,
    then: Yup.object().shape({
      city: Yup.string().trim().required(ERROR_MESSAGE),
      courierOffice: Yup.string().trim().required(ERROR_MESSAGE)
    })
  });

const worldWideValidation = (type) =>
  Yup.object().when(inputName.sentBy, {
    is: type,
    then: Yup.object().shape({
      messenger: Yup.string().required(ERROR_MESSAGE),
      messengerPhone: Yup.string()
        .trim()
        .matches(phoneNumberRegex, PHONE_NUMBER_TYPE_MESSAGE)
        .required(ERROR_MESSAGE),
      worldWideCountry: Yup.string().required(ERROR_MESSAGE),
      stateOrProvince: Yup.string().required(ERROR_MESSAGE),
      worldWideCity: Yup.string().required(ERROR_MESSAGE),
      worldWideStreet: Yup.string().required(ERROR_MESSAGE),
      cityCode: Yup.string()
        .required(ERROR_MESSAGE)
        .matches(onlyNumbersRegex, MUST_BE_NUMBER)
    })
  });

export const validationSchema = Yup.object().shape({
  status: Yup.string().required(ERROR_MESSAGE),
  paymentMethod: Yup.string().required(ERROR_MESSAGE),
  isPaid: Yup.bool().required(),
  recipient: Yup.object().shape({
    firstName: Yup.string()
      .trim()
      .matches(userNameRegex, NAME_MESSAGE)
      .required(ERROR_MESSAGE),
    lastName: Yup.string()
      .trim()
      .matches(userNameRegex, NAME_MESSAGE)
      .required(ERROR_MESSAGE),
    email: Yup.string()
      .trim()
      .email(USER_INVALID_EMAIL_MESSAGE)
      .required(ERROR_MESSAGE),
    phoneNumber: Yup.string()
      .trim()
      .matches(phoneNumberWithoutLettersRegex, PHONE_NUMBER_TYPE_MESSAGE)
      .matches(phoneNumberRegex, INVALID_PHONE_MESSAGE)
      .required(ERROR_MESSAGE)
  }),
  userComment: Yup.string()
    .min(2, MIN_LENGTH_MESSAGE)
    .max(500, MAX_LENGTH_MESSAGE_500),
  items: Yup.array().required(ERROR_MESSAGE),
  delivery: Yup.object().shape({
    sentBy: Yup.string().trim().required(ERROR_MESSAGE),
    courier: Yup.object().when(inputName.sentBy, {
      is: (val) =>
        val === deliveryTypes.ukrPostCourier ||
        val === deliveryTypes.novaPostCourier,
      then: Yup.object().shape({
        city: Yup.string().trim().required(ERROR_MESSAGE),
        street: Yup.string().trim().required(ERROR_MESSAGE),
        house: Yup.string().trim().required(ERROR_MESSAGE),
        flat: Yup.string().trim().required(ERROR_MESSAGE)
      })
    }),
    novaPost: postValidation(deliveryTypes.novaPost),
    ukrPost: postValidation(deliveryTypes.ukrPost),
    worldWide: worldWideValidation(deliveryTypes.worldWide)
  })
});
