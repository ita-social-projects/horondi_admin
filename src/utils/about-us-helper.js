import _ from 'lodash';
import { config } from '../configs';
import { imgNameRegex } from '../configs/regexes';

const { imgSizes } = config;

export const getInitialValuesForTitleEditing = ({ translations }) => ({
  uaTitle: translations.ua.title,
  enTitle: translations.en.title
});

export const getUaTitleFromBusinessPageSection = ({ translations }, id) =>
  translations.ua.sections.find((section) => section.id === id).title;

export const getEnTitleFromBusinessPageSection = ({ translations }, id) =>
  translations.en.sections.find((section) => section.id === id).title;

export const getUaTextFromBusinessPageSection = ({ translations }, id) =>
  translations.ua.sections.find((section) => section.id === id).text;

export const getEnTextFromBusinessPageSection = ({ translations }, id) =>
  translations.en.sections.find((section) => section.id === id).text;

export const getImgFromBusinessPageSection = ({ sectionsImgs }, id) =>
  sectionsImgs.find((section) => section.id === id);

export const getFooterImgFromBusinessPage = (businessPage) =>
  businessPage.footerImg;

export const getInitialValuesForSectionEditing = (businessPage, id) => ({
  uaTitle: getUaTitleFromBusinessPageSection(businessPage, id) || '',
  enTitle: getEnTitleFromBusinessPageSection(businessPage, id) || '',
  uaText: getUaTextFromBusinessPageSection(businessPage, id),
  enText: getEnTextFromBusinessPageSection(businessPage, id),
  img: getImgFromBusinessPageSection(businessPage, id).src
});

export const getInitialValuesForSectionAdd = () => ({
  uaTitle: '',
  enTitle: '',
  uaText: '',
  enText: '',
  img: ''
});

export const getInitialValuesForFooterImgEdit = (businessPage) => ({
  img: businessPage.footerImg?.src || ''
});

export const getImageNamesFromSection = (businessPage, id) => {
  const imgSrc = getImgFromBusinessPageSection(businessPage, id).src;
  const imgName = imgSrc.match(imgNameRegex)[2];
  return Object.values(imgSizes).map((imgSize) => `${imgSize}_${imgName}`);
};

export const getFooterImgNames = (businessPage) => {
  const imgSrc = getFooterImgFromBusinessPage(businessPage).src;
  const imgName = imgSrc.match(imgNameRegex)[2];
  return Object.values(imgSizes).map((imgSize) => `${imgSize}_${imgName}`);
};

export const getBusinessPageWithUpdatedTitle = (businessPage, values) => {
  const businessPageCopy = _.cloneDeep(businessPage);
  businessPageCopy.translations.ua.title = values.uaTitle;
  businessPageCopy.translations.en.title = values.enTitle;
  return businessPageCopy;
};

export const getBusinessPageWithUpdatedSection = (
  businessPage,
  values,
  id,
  filename
) => {
  const businessPageCopy = _.cloneDeep(businessPage);
  businessPageCopy.translations.ua.sections.find(
    (section) => section.id === id
  ).title = values.uaTitle;
  businessPageCopy.translations.en.sections.find(
    (section) => section.id === id
  ).title = values.enTitle;
  businessPageCopy.translations.ua.sections.find(
    (section) => section.id === id
  ).text = values.uaText;
  businessPageCopy.translations.en.sections.find(
    (section) => section.id === id
  ).text = values.enText;

  if (filename) {
    const sectionImgIndex = businessPageCopy.sectionsImgs.findIndex(
      (section) => section.id === id
    );
    businessPageCopy.sectionsImgs[sectionImgIndex] = {
      id,
      name: filename
    };
  }
  return businessPageCopy;
};

export const getBusinessPageWithUpdatedFooterImg = (businessPage, filename) => {
  const businessPageCopy = _.cloneDeep(businessPage);
  businessPageCopy.footerImg = {
    name: filename
  };
  return businessPageCopy;
};

export const getBusinessPageWithNewSection = (
  businessPage,
  values,
  filename
) => {
  const businessPageCopy = _.cloneDeep(businessPage);
  const id = Date.now().toString();
  const uaSection = {
    id,
    title: values.uaTitle,
    text: values.uaText,
    img: { name: filename }
  };
  const enSection = {
    id,
    title: values.enTitle,
    text: values.enText,
    img: { name: filename }
  };
  businessPageCopy.sections[0].value = [
    ...businessPage.sections[0].value,
    uaSection
  ];
  businessPageCopy.sections[1].value = [
    ...businessPage.sections[1].value,
    enSection
  ];
  return businessPageCopy;
};

export const getBusinessPageWithoutSection = (businessPage, sectionId) => {
  const businessPageCopy = _.cloneDeep(businessPage);
  businessPageCopy.sections[0].value =
    businessPageCopy.sections[0].value.filter(
      (section) => section.id !== sectionId
    );
  businessPageCopy.sections[1].value =
    businessPageCopy.sections[1].value.filter(
      (section) => section.id !== sectionId
    );
  return businessPageCopy;
};

export const setVariablesForUpdatingPage = (businessPage, files = []) => ({
  id: businessPage._id,
  businessText: getBusinessText(businessPage),
  businessTextTranslationFields: businessPage.translations,
  files,
  populated: true
});

export const getBusinessText = (businessPage) => ({
  code: businessPage.code,
  sectionsImgs: businessPage.sectionsImgs,
  languages: businessPage.languages,
  footerImg: businessPage.footerImg
});
