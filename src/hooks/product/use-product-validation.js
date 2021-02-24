import * as Yup from 'yup';
import { useState } from 'react';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';

import { capitalize } from '@material-ui/core';
import { config } from '../../configs';
import { productsTranslations } from '../../translations/product.translations';

const selectName = ({ name, validation, required }) =>
  required
    ? [
      name,
      validation === 'number'
        ? Yup[validation]().min(1, REQUIRED_FIELD).required()
        : Yup[validation]().required()
    ]
    : [
      name,
      validation === 'number'
        ? Yup[validation]().min(1, REQUIRED_FIELD)
        : Yup[validation]()
    ];

const {
  labels: {
    product: { infoLabels, selectsLabels, materialLabels }
  },
  languages
} = config;

const {
  REQUIRED_FIELD,
  NAME_TOO_LONG_MESSAGE,
  NAME_TOO_SHORT_MESSAGE
} = productsTranslations;

const useProductValidation = (
  formikInfo,
  onSubmit,
  formikSpeciesValues,
  product,
  formikPriceValue,
  formikMaterialsValues
) => {
  const [shouldValidate, setShouldValidate] = useState(false);

  const { name, description } = useSelector(({ Products }) => ({
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
        [`${lang}${capitalize(infoLabels[0].name)}`]: name[idx].value,
        [`${lang}${capitalize(infoLabels[1].name)}`]: description[idx].value
      }))
    )
    : {};

  const yupInfoSchema = formikInfo
    ? Object.assign(
      ...languages.map((lang) => ({
        [`${lang}${capitalize(infoLabels[0].name)}`]: Yup.string()
          .min(6, NAME_TOO_SHORT_MESSAGE)
          .max(50, NAME_TOO_LONG_MESSAGE)
          .required(REQUIRED_FIELD),
        [`${lang}${capitalize(infoLabels[1].name)}`]: Yup.string()
          .min(2, NAME_TOO_SHORT_MESSAGE)
          .max(150, NAME_TOO_LONG_MESSAGE)
          .required(REQUIRED_FIELD)
      }))
    )
    : {};
  const yupMaterialsSchema = formikMaterialsValues
    ? Object.fromEntries(materialLabels.map(selectName))
    : {};
  const yupSpeciesSchema = formikSpeciesValues
    ? Object.fromEntries(selectsLabels.map(selectName))
    : {};

  const yupPriceSchema = formikPriceValue
    ? { basePrice: Yup.number().min(1, REQUIRED_FIELD).required() }
    : {};

  const yupSchema = Yup.object().shape({
    ...yupInfoSchema,
    ...yupSpeciesSchema,
    ...yupPriceSchema,
    ...yupMaterialsSchema
  });

  const formikValues = {
    ...formikInfoValues,
    ...formikSpeciesValues,
    ...formikPriceValue,
    ...formikMaterialsValues
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
