import * as Yup from 'yup';
import { useState } from 'react';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';

import { config } from '../../configs';
import { productsTranslations } from '../../translations/product.translations';

const {
  labels: {
    product: { infoLabels, selectsLabels }
  },
  languages
} = config;

const {
  REQUIRED_FIELD,
  NAME_TOO_LONG_MESSAGE,
  NAME_TOO_SHORT_MESSAGE,
  MAIN_MATERIAL_TOO_LONG_MESSAGE,
  MAIN_MATERIAL_TOO_SHORT_MESSAGE,
  INNER_MATERIAL_TOO_LONG_MESSAGE,
  INNER_MATERIAL_TOO_SHORT_MESSAGE,
  CLOSURE_TOO_LONG_MESSAGE,
  CLOSURE_TOO_SHORT_MESSAGE
} = productsTranslations;

const useProductValidation = (
  formikInfo,
  onSubmit,
  formikSpeciesValues,
  product,
  formikPriceValue
) => {
  const [shouldValidate, setShouldValidate] = useState(false);

  const {
    name,
    mainMaterial,
    innerMaterial,
    closure,
    description,
    strapLengthInCm
  } = useSelector(({ Products }) => ({
    name: Products[product].name,
    mainMaterial: Products[product].mainMaterial,
    innerMaterial: Products[product].innerMaterial,
    closure: Products[product].closure,
    strapLengthInCm: Products[product].strapLengthInCm,
    description: Products[product].description
  }));

  const formikInfoValues = formikInfo
    ? Object.assign(
      ...languages.map((lang, idx) => ({
        [`${lang}-${infoLabels[0].name}`]: name[idx].value,
        [`${lang}-${infoLabels[1].name}`]: mainMaterial[idx].value,
        [`${lang}-${infoLabels[2].name}`]: innerMaterial.length
          ? innerMaterial[idx].value
          : '',
        [`${lang}-${infoLabels[3].name}`]: closure.length
          ? closure[idx].value
          : '',
        [`${infoLabels[4].name}`]: strapLengthInCm,
        [`${lang}-${infoLabels[5].name}`]: description[idx].value
      }))
    )
    : {};

  const yupInfoSchema = formikInfo
    ? Object.assign(
      ...languages.map((lang) => ({
        [`${lang}-${infoLabels[0].name}`]: Yup.string()
          .min(6, NAME_TOO_SHORT_MESSAGE)
          .max(50, NAME_TOO_LONG_MESSAGE)
          .required(REQUIRED_FIELD),
        [`${lang}-${infoLabels[1].name}`]: Yup.string()
          .min(2, MAIN_MATERIAL_TOO_SHORT_MESSAGE)
          .max(150, MAIN_MATERIAL_TOO_LONG_MESSAGE)
          .required(REQUIRED_FIELD),
        [`${lang}-${infoLabels[2].name}`]: Yup.string()
          .min(2, INNER_MATERIAL_TOO_SHORT_MESSAGE)
          .max(150, INNER_MATERIAL_TOO_LONG_MESSAGE),
        [`${lang}-${infoLabels[3].name}`]: Yup.string()
          .min(2, CLOSURE_TOO_SHORT_MESSAGE)
          .max(100, CLOSURE_TOO_LONG_MESSAGE)
      })),
      { strapLengthInCm: Yup.number() }
    )
    : {};

  const yupSpeciesSchema = formikSpeciesValues
    ? Object.fromEntries(
      selectsLabels.map(({ name }) => [name, Yup.string().required()])
    )
    : {};

  const yupPriceSchema = formikPriceValue
    ? { basePrice: Yup.number().min(1, REQUIRED_FIELD).required() }
    : {};

  const yupSchema = Yup.object().shape({
    ...yupInfoSchema,
    ...yupSpeciesSchema,
    ...yupPriceSchema
  });

  const formikValues = {
    ...formikInfoValues,
    ...formikSpeciesValues,
    ...formikPriceValue
  };

  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleChange,
    handleBlur,
    submitForm,
    setFieldValue
  } = useFormik({
    initialValues: formikValues,
    validationSchema: yupSchema,
    onSubmit,
    validateOnBlur: shouldValidate,
    validateOnChange: shouldValidate
  });

  const handleValuesSubmit = async () => {
    setShouldValidate(true);
    await submitForm();
  };

  return {
    shouldValidate,
    setShouldValidate,
    values,
    errors,
    touched,
    handleSubmit,
    handleChange,
    handleBlur,
    submitForm,
    setFieldValue,
    handleValuesSubmit
  };
};

export default useProductValidation;
