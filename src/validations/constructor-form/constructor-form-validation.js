import * as Yup from 'yup';
import { config } from '../../configs';

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
    material: Yup.string().required(ERROR_MESSAGE),
    color: Yup.string().required(ERROR_MESSAGE),
    additionalPriceType: Yup.string(),
    additionalPrice: Yup.string()
      .required(ERROR_MESSAGE)
      .matches(config.formRegExp.onlyPositiveFloat, PRICE_ERROR)
      .nullable(),
    image: Yup.string().required(PHOTO_NOT_PROVIDED)
  };

  switch (optionType) {
    case 'STRAPS':
    case 'CLOSURES':
    case 'POCKETS':
      validationObject.color = Yup.string().required(ERROR_MESSAGE);
      break;

    case 'bottom':
    case 'basic':
    case 'back':
    case 'strap':
      validationObject.color = Yup.string().required(ERROR_MESSAGE);
      validationObject.material = Yup.string().required(ERROR_MESSAGE);
      break;

    default:
      break;
  }

  return Yup.object().shape(validationObject);
};
