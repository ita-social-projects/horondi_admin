import * as Yup from 'yup';
import formRegExp from '../../configs/form-regexp';
import { config } from '../../configs';

const {
  LENGTH_CODE,
  STYLE_CODE,
  ERROR_MESSAGE,
  POSITIVE_DISCOUNT,
  INTEGER_DISCOUNT,
  MAX_VALUE_DISCOUNT,
  DATEFROM_SMALLER_THAN_DATETO
} = config.promoCodeErrorMessages;

export const promoValidationSchema = Yup.object().shape({
  code: Yup.string()
    .min(2, LENGTH_CODE)
    .max(30, LENGTH_CODE)
    .matches(formRegExp.promoCodeName, STYLE_CODE)
    .required(ERROR_MESSAGE),
  dateFrom: Yup.date()
    .max(Yup.ref('dateTo'), DATEFROM_SMALLER_THAN_DATETO)
    .required(ERROR_MESSAGE),
  dateTo: Yup.date()
    .min(Yup.ref('dateFrom'), DATEFROM_SMALLER_THAN_DATETO)
    .required(ERROR_MESSAGE),
  discount: Yup.number()
    .integer(INTEGER_DISCOUNT)
    .positive(POSITIVE_DISCOUNT)
    .max(90, MAX_VALUE_DISCOUNT)
    .required(ERROR_MESSAGE),
  categories: Yup.array().min(1, ERROR_MESSAGE).required(ERROR_MESSAGE)
});
