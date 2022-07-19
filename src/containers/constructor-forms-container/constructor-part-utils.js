import * as Yup from 'yup';

import { config } from '../../configs';

const { PHOTO_NOT_PROVIDED } = config.bottomErrorMessages;
const { MIN_LENGTH_MESSAGE, MAX_LENGTH_MESSAGE, PRICE_ERROR, ERROR_MESSAGE } =
  config.commonErrorMessages;

export const bottomUseEffectHandler = (bottom, setBottomFn, imagePrefix) => {
  if (bottom?.images.thumbnail) {
    setBottomFn(`${imagePrefix}${bottom.images.thumbnail}`);
  }
};

export const bottomFormOnSubmit = (
  editAndUpload,
  dispatch,
  updateBottom,
  updateActionPayload,
  edit,
  secondUpdateActionPayload
) => {
  if (editAndUpload) {
    dispatch(updateBottom(updateActionPayload));
    return;
  }
  if (edit) {
    dispatch(updateBottom(secondUpdateActionPayload));
  }
};

export const setBottomColorsHandler = (values, setColors, materials) => {
  const materialColors =
    materials?.find((material) => material._id === values.material)?.colors ||
    [];
  setColors(materialColors);
};

export const getPartInitialValues = (edit, IMG_URL, part) => {
  const initialValues = {
    image: edit ? IMG_URL + part.images.thumbnail : '',
    uaName: part.name[0].value,
    enName: part.name[1].value,
    additionalPriceType: part.absolutePrice ? 'ABSOLUTE' : 'RELATIVE',
    additionalPrice: part.absolutePrice
      ? part.absolutePrice
      : part.relativePrice,
    available: part.available,
    optionType: part.optionType
  };

  switch (part.optionType) {
    case 'STRAPS':
    case 'CLOSURES':
    case 'POCKETS':
      initialValues.color = part.features.color;
      break;

    case 'BOTTOM':
    case 'BASICS':
    case 'BACKS':
      initialValues.color = part.features.color._id;
      initialValues.material = part.features.material._id;
      break;

    default:
      break;
  }

  return initialValues;
};

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

    case 'BOTTOM':
    case 'BASICS':
    case 'BACKS':
      validationObject.color = Yup.string().required(ERROR_MESSAGE);
      validationObject.material = Yup.string().required(ERROR_MESSAGE);
      break;

    default:
      break;
  }

  return Yup.object().shape(validationObject);
};
