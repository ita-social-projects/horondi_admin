import { config } from '../configs';

const { languages } = config;

export const getInitialValuesForMaterialsAdd = () => ({
  uaTitle: '',
  enTitle: '',
  uaText: '',
  enText: '',
  img: ''
});

export const setVariablesForMaterialsAdd = (values, currentType) => ({
  type: currentType,
  title: values.uaTitle,
  text: [
    { lang: languages[0], value: values.uaText },
    { lang: languages[1], value: values.enText }
  ]
});
