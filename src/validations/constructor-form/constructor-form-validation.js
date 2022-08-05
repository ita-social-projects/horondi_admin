import * as Yup from 'yup';
import { config } from '../../configs';

// TODO:  provide multipupose error mesages
const { PHOTO_NOT_PROVIDED } = config.bottomErrorMessages;
const { MIN_LENGTH_MESSAGE, MAX_LENGTH_MESSAGE, PRICE_ERROR, ERROR_MESSAGE } =
  config.commonErrorMessages;

export const getValidationSchema = (optionType) => {
  const validationObject = {
    uaName: Yup.string()
      .min(2, MIN_LENGTH_MESSAGE)
      .max(50, MAX_LENGTH_MESSAGE)
      .required(ERROR_MESSAGE),
    enName: Yup.string()
      .min(2, MIN_LENGTH_MESSAGE)
      .max(50, MAX_LENGTH_MESSAGE)
      .required(ERROR_MESSAGE),
    additionalPriceType: Yup.string(),
    additionalPrice: Yup.string()
      .required(ERROR_MESSAGE)
      .matches(config.formRegExp.onlyPositiveFloat, PRICE_ERROR)
      .nullable(),
    image: Yup.string().required(PHOTO_NOT_PROVIDED)
  };

  switch (optionType) {
    case 'CLOSURE':
      validationObject.color = Yup.string().required(ERROR_MESSAGE);
      break;

    case 'POCKET':
      validationObject.positions = Yup.array().required(ERROR_MESSAGE);
      break;

    case 'BOTTOM':
    case 'BASIC':
    case 'BACK':
    case 'STRAP':
      validationObject.color = Yup.string().required(ERROR_MESSAGE);
      validationObject.material = Yup.string().required(ERROR_MESSAGE);
      break;

    default:
      break;
  }

  return Yup.object().shape(validationObject);
};
