import { config } from '../configs';

const { languages, IMG_URL } = config;

export const getInitialValuesForMaterialsBlock = ({
  title = '',
  text,
  image
}) => ({
  img: image ? IMG_URL + image?.small : '',
  uaTitle: title,
  enTitle: title,
  uaText: text ? text[0]?.value : '',
  enText: text ? text[1]?.value : ''
});

export const setVariablesForMaterialsBlock = (values, currentType) => ({
  type: currentType,
  title: values.uaTitle,
  text: [
    { lang: languages[0], value: values.uaText },
    { lang: languages[1], value: values.enText }
  ]
});
