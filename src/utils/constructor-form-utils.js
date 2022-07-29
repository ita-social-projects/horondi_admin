import * as Yup from 'yup';

import { config } from '../configs';

const { PHOTO_NOT_PROVIDED } = config.bottomErrorMessages;
const { MIN_LENGTH_MESSAGE, MAX_LENGTH_MESSAGE, PRICE_ERROR, ERROR_MESSAGE } =
  config.commonErrorMessages;

export const partItemColorsHandler = (values, setColors, materials) => {
  const materialColors =
    materials?.find((material) => material._id === values.material)?.colors ||
    [];
  setColors(materialColors);
};

export const getPartItemInitialValues = (edit, IMG_URL, partItem) => {
  const initialValues = {
    image: edit ? IMG_URL + partItem.images.thumbnail : '',
    uaName: partItem.name[0].value,
    enName: partItem.name[1].value,
    additionalPriceType: partItem.absolutePrice ? 'ABSOLUTE' : 'RELATIVE',
    additionalPrice: partItem.absolutePrice
      ? partItem.absolutePrice
      : partItem.relativePrice,
    available: partItem.available,
    optionType: partItem.optionType
  };

  switch (partItem.optionType) {
    case 'STRAPS':
    case 'CLOSURES':
    case 'POCKETS':
      initialValues.color = partItem.features.color;
      break;

    case 'BOTTOM':
    case 'BASICS':
    case 'BACKS':
      initialValues.color = partItem.features.color._id;
      initialValues.material = partItem.features.material._id;
      break;

    default:
      break;
  }

  return initialValues;
};

export const getCheckboxOptions = (values, label, handler) => [
  {
    id: 'available',
    dataCy: 'available',
    value: values.available,
    checked: values.available,
    color: 'primary',
    label,
    handler: () => handler('available', !values.available)
  }
];

export const getDefaultPartItem = (partKey) => {
  const optionType = partKey.toUpperCase();

  const constructorObject = {
    _id: '',
    name: [
      {
        value: ''
      },
      {
        value: ''
      }
    ],
    optionType,
    images: {
      thumbnail: ''
    },
    absolutePrice: ' ',
    relativePrice: null,
    available: false
  };

  switch (partKey) {
    case 'straps':
    case 'closures':
    case 'pockets':
      constructorObject.features = {
        color: {
          _id: '',
          name: [
            {
              value: ''
            },
            {
              value: ''
            }
          ]
        }
      };
      break;

    case 'bottom':
    case 'basics':
    case 'backs':
      constructorObject.features = {
        material: {
          _id: '',
          name: [
            {
              value: ''
            },
            {
              value: ''
            }
          ]
        },
        color: {
          _id: '',
          name: [
            {
              value: ''
            },
            {
              value: ''
            }
          ]
        }
      };
      break;

    default:
      break;
  }

  return constructorObject;
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
