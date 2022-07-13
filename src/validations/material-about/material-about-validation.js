import * as Yup from 'yup';
import { config } from '../../configs';

const { ERROR_MESSAGE } = config.commonErrorMessages;
const { NO_STRING_TYPE_MESSAGE, REQUIRED_IMG_MESSAGE } =
  config.materialAboutErrorMessages;

export const validationSchema = Yup.object().shape({
  uaTitle: Yup.string()
    .typeError(NO_STRING_TYPE_MESSAGE)
    .required(ERROR_MESSAGE),
  enTitle: Yup.string()
    .typeError(NO_STRING_TYPE_MESSAGE)
    .required(ERROR_MESSAGE),
  uaText: Yup.string()
    .typeError(NO_STRING_TYPE_MESSAGE)
    .required(ERROR_MESSAGE),
  enText: Yup.string()
    .typeError(NO_STRING_TYPE_MESSAGE)
    .required(ERROR_MESSAGE),
  img: Yup.string().required(REQUIRED_IMG_MESSAGE)
});
