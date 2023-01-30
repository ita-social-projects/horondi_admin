import * as Yup from 'yup';
import { config } from '../../configs';

const {
  MIN_LENGTH_MESSAGE,
  MAX_LENGTH_MESSAGE_SIZE,
  MIN_WEIGHT_MESSAGE_SIZE,
  MAX_WEIGHT_MESSAGE_SIZE,
  NO_NUMBER_TYPE_MESSAGE
} = config.sizeErrorMessages;

const { ERROR_MESSAGE, PRICE_ERROR } = config.commonErrorMessages;

export const formSchema = Yup.object().shape({
  name: Yup.string().required(ERROR_MESSAGE),
  heightInCm: Yup.number()
    .typeError(NO_NUMBER_TYPE_MESSAGE)
    .min(1, MIN_LENGTH_MESSAGE)
    .max(35, MAX_LENGTH_MESSAGE_SIZE)
    .required(ERROR_MESSAGE),
  widthInCm: Yup.number()
    .typeError(NO_NUMBER_TYPE_MESSAGE)
    .min(1, MIN_LENGTH_MESSAGE)
    .max(35, MAX_LENGTH_MESSAGE_SIZE)
    .required(ERROR_MESSAGE),
  depthInCm: Yup.number()
    .typeError(NO_NUMBER_TYPE_MESSAGE)
    .min(1, MIN_LENGTH_MESSAGE)
    .max(35, MAX_LENGTH_MESSAGE_SIZE)
    .required(ERROR_MESSAGE),
  volumeInLiters: Yup.number()
    .typeError(NO_NUMBER_TYPE_MESSAGE)
    .min(1, MIN_LENGTH_MESSAGE)
    .max(35, MAX_LENGTH_MESSAGE_SIZE)
    .required(ERROR_MESSAGE),
  weightInKg: Yup.number()
    .typeError(NO_NUMBER_TYPE_MESSAGE)
    .min(0.1, MIN_WEIGHT_MESSAGE_SIZE)
    .max(5, MAX_WEIGHT_MESSAGE_SIZE)
    .required(ERROR_MESSAGE),
  available: Yup.bool().required(ERROR_MESSAGE),
  additionalPriceType: Yup.string(),
  additionalPrice: Yup.string()
    .matches(config.formRegExp.onlyPositiveFloat, PRICE_ERROR)
    .required(ERROR_MESSAGE)
});
