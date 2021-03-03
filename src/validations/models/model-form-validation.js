import * as Yup from 'yup';
import { config } from '../../configs';

const {
  MODEL_VALIDATION_ERROR,
  MODEL_ERROR_MESSAGE
} = config.modelErrorMessages;

export const modelValidationSchema = Yup.object().shape({
  enDescription: Yup.string()
    .min(2, MODEL_VALIDATION_ERROR)
    .required(MODEL_ERROR_MESSAGE),
  enName: Yup.string()
    .min(2, MODEL_VALIDATION_ERROR)
    .required(MODEL_ERROR_MESSAGE),
  uaDescription: Yup.string()
    .min(2, MODEL_VALIDATION_ERROR)
    .required(MODEL_ERROR_MESSAGE),
  uaName: Yup.string()
    .min(2, MODEL_VALIDATION_ERROR)
    .required(MODEL_ERROR_MESSAGE),
  priority: Yup.number(),
  category: Yup.string()
});
