import * as Yup from 'yup';
import { config } from '../../configs';

const {
  MAX_LENGTH_MESSAGE,
  MIN_LENGTH_MESSAGE,
  MAX_LENGTH_MESSAGE_SIZE,
  MIN_LENGTH_MESSAGE_SIZE,
  MIN_WEIGHT_MESSAGE_SIZE,
  MAX_WEIGHT_MESSAGE_SIZE,
  VALIDATION_ERROR,
  PRICE_VALIDATION_ERROR,
  NOT_UA_INPUT_MESSAGE,
  NOT_EN_INPUT_MESSAGE,
  NO_NUMBER_TYPE_MESSAGE,
  NO_STRING_TYPE_MESSAGE
} = config.sizeErrorMessages;

export const formSchema = Yup.object().shape({
  name: Yup.string().required(VALIDATION_ERROR),

  simpleNameUa: Yup.string()
    .typeError(NO_STRING_TYPE_MESSAGE)
    .matches(config.formRegExp.uaNameCreation, NOT_UA_INPUT_MESSAGE)
    .min(1, MIN_LENGTH_MESSAGE_SIZE)
    .max(20, MAX_LENGTH_MESSAGE)
    .required(VALIDATION_ERROR),

  simpleNameEn: Yup.string()
    .typeError(NO_STRING_TYPE_MESSAGE)
    .matches(config.formRegExp.enNameCreation, NOT_EN_INPUT_MESSAGE)
    .min(1, MIN_LENGTH_MESSAGE_SIZE)
    .max(20, MAX_LENGTH_MESSAGE)
    .required(VALIDATION_ERROR),
  heightInCm: Yup.number()
    .typeError(NO_NUMBER_TYPE_MESSAGE)
    .min(1, MIN_LENGTH_MESSAGE)
    .max(35, MAX_LENGTH_MESSAGE_SIZE)
    .required(VALIDATION_ERROR),
  widthInCm: Yup.number()
    .typeError(NO_NUMBER_TYPE_MESSAGE)
    .min(1, MIN_LENGTH_MESSAGE)
    .max(35, MAX_LENGTH_MESSAGE_SIZE)
    .required(VALIDATION_ERROR),
  depthInCm: Yup.number()
    .typeError(NO_NUMBER_TYPE_MESSAGE)
    .min(1, MIN_LENGTH_MESSAGE)
    .max(35, MAX_LENGTH_MESSAGE_SIZE)
    .required(VALIDATION_ERROR),
  volumeInLiters: Yup.number()
    .typeError(NO_NUMBER_TYPE_MESSAGE)
    .min(1, MIN_LENGTH_MESSAGE)
    .max(35, MAX_LENGTH_MESSAGE_SIZE)
    .required(VALIDATION_ERROR),
  weightInKg: Yup.number()
    .typeError(NO_NUMBER_TYPE_MESSAGE)
    .min(0.1, MIN_WEIGHT_MESSAGE_SIZE)
    .max(5, MAX_WEIGHT_MESSAGE_SIZE)
    .required(VALIDATION_ERROR),
  available: Yup.bool().required(VALIDATION_ERROR),

  additionalPrice: Yup.string()
    .matches(config.formRegExp.onlyPositiveDigits, PRICE_VALIDATION_ERROR)
    .required(VALIDATION_ERROR)
});
