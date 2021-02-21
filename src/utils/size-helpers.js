import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { config } from '../configs';

const { languages } = config;

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

export const createSizeNamelist = () => [
  [
    'heightInCm',
    'widthInCm',
    'depthInCm',
    'volumeInLiters',
    'weightInKg',
    'additionalPrice'
  ],
  ['simpleNameUa', 'simpleNameEn']
];

export const createSize = (data) => ({
  name: data.name,
  simpleName: [
    { lang: languages[0], value: data.simpleNameUa },
    { lang: languages[1], value: data.simpleNameEn }
  ],
  heightInCm: data.heightInCm,
  widthInCm: data.widthInCm,
  depthInCm: data.depthInCm,
  volumeInLiters: data.volumeInLiters,
  weightInKg: data.weightInKg,
  available: data.available,
  additionalPrice: data.additionalPrice
});

export const getSizeInitialValues = (size) => ({
  name: size.name || 'M',
  simpleNameUa: size.simpleName[0].value || '',
  simpleNameEn: size.simpleName[1].value || '',
  heightInCm: size.heightInCm || '',
  widthInCm: size.widthInCm || '',
  depthInCm: size.depthInCm || '',
  volumeInLiters: size.volumeInLiters || '',
  weightInKg: size.weightInKg || '',
  available: size.available || false,
  additionalPrice: size.additionalPrice[1].value / 100 || 0
});

export const sizePropTypes = {
  id: PropTypes.string,
  size: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    heightInCm: PropTypes.number,
    widthInCm: PropTypes.number,
    depthInCm: PropTypes.number,
    volumeInLiters: PropTypes.number,
    weightInKg: PropTypes.number,
    available: PropTypes.bool,
    additionalPrice: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.number
      })
    ),
    simpleName: PropTypes.arrayOf(
      PropTypes.shape({
        lang: PropTypes.string,
        value: PropTypes.string
      })
    )
  })
};
export const sizeDefaultProps = {
  id: '',
  size: {
    _id: '',
    name: '',
    simpleName: [
      { lang: '', value: '' },
      { lang: '', value: '' }
    ],
    heightInCm: '',
    widthInCm: '',
    depthInCm: '',
    volumeInLiters: '',
    weightInKg: '',
    available: '',
    additionalPrice: [
      {
        value: 0
      },
      {
        value: 0
      }
    ]
  }
};
