import * as Yup from 'yup';
import { useMemo, useState } from 'react';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';

import { config } from '../configs';
import { productsTranslations } from '../translations/product.translations';

const {
  product: { infoLabels },
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
  checkedLanguages,
  onSubmit,
  formikSpeciesValues,
  product
) => {
  const [shouldValidate, setShouldValidate] = useState(false);

  const {
    name,
    mainMaterial,
    innerMaterial,
    closure,
    description
  } = useSelector(({ Products }) => ({
    name: Products[product].name,
    mainMaterial: Products[product].mainMaterial,
    innerMaterial: Products[product].innerMaterial,
    closure: Products[product].closure,
    description: Products[product].description
  }));

  const formikInfoValues = checkedLanguages
    ? Object.assign(
      ...languages.map((lang, idx) => ({
        [`${lang}${infoLabels[0].name}`]: name[idx].value,
        [`${lang}${infoLabels[1].name}`]: mainMaterial[idx].value,
        [`${lang}${infoLabels[2].name}`]: innerMaterial.length ? innerMaterial[idx].value : '',
        [`${lang}${infoLabels[3].name}`]: closure.length ? closure[idx].value : '',
        [`${lang}${infoLabels[4].name}`]: description[idx].value
      }))
    )
    : {};

  const yupInfoSchema = useMemo(
    () =>
      checkedLanguages.length
        ? Object.assign(
          ...checkedLanguages.map(({ name }) => ({
            [`${name}${infoLabels[0].name}`]: Yup.string()
              .min(6, NAME_TOO_SHORT_MESSAGE)
              .max(50, NAME_TOO_LONG_MESSAGE)
              .required(REQUIRED_FIELD),
            [`${name}${infoLabels[1].name}`]: Yup.string()
              .min(2, MAIN_MATERIAL_TOO_SHORT_MESSAGE)
              .max(150, MAIN_MATERIAL_TOO_LONG_MESSAGE)
              .required(REQUIRED_FIELD),
            [`${name}${infoLabels[2].name}`]: Yup.string()
              .min(2, INNER_MATERIAL_TOO_SHORT_MESSAGE)
              .max(150, INNER_MATERIAL_TOO_LONG_MESSAGE),
            [`${name}${infoLabels[3].name}`]: Yup.string()
              .min(2, CLOSURE_TOO_SHORT_MESSAGE)
              .max(100, CLOSURE_TOO_LONG_MESSAGE)
          }))
        )
        : {},
    [checkedLanguages]
  );

  const yupSpeciesSchema = formikSpeciesValues
    ? {
      category: Yup.string().required(),
      subcategory: Yup.string().required(),
      pattern: Yup.string().required(),
      colors: Yup.string().required(),
      model: Yup.string().required(),
      basePrice: Yup.number().min(1).required(),
      strapLengthInCm: Yup.number()
    }
    : {};

  const yupSchema = Yup.object().shape({
    ...yupInfoSchema,
    ...yupSpeciesSchema
  });
  const formikValues = { ...formikInfoValues, ...formikSpeciesValues };

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
    setFieldValue
  };
};

export default useProductValidation;
