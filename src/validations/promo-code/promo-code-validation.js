import * as Yup from 'yup';
import formRegExp from '../../configs/form-regexp';
import { config } from '../../configs';

const {
  LENGTH_CODE,
  STYLE_CODE,
  ERROR_MESSAGE,
  LENGTH_DISCOUNT,
  POSITIVE_DISCOUNT,
  MULTIPLE_DISCOUNT
} = config.promoCodeErrorMessages;

export const promoValidationSchema = Yup.object().shape({
  code: Yup.string()
    .min(2, LENGTH_CODE)
    .max(30, LENGTH_CODE)
    .matches(formRegExp.promoCodeName, STYLE_CODE)
    .required(ERROR_MESSAGE),
  dateFrom: Yup.string().required(ERROR_MESSAGE),
  dateTo: Yup.string().required(ERROR_MESSAGE),
  discount: Yup.string()
    .min(1, LENGTH_DISCOUNT)
    .max(2, LENGTH_DISCOUNT)
    .matches(formRegExp.promoCodeDiscountPositive, POSITIVE_DISCOUNT)
    .matches(formRegExp.promoCodeDiscountMultiple, MULTIPLE_DISCOUNT)
    .required(ERROR_MESSAGE),
  categories: Yup.array().min(1, ERROR_MESSAGE).required(ERROR_MESSAGE)
});
