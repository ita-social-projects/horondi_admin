import React, { useState } from 'react';
import { FormControlLabel, Checkbox } from '@material-ui/core';
import { config } from '../configs';

const { languages } = config;

const useNewsHandlers = () => {
  const checkboxStates = languages.reduce(
    (obj, lang) => ({ ...obj, [lang]: false }),
    {}
  );

  const [uploadAuthorImage, setUploadAuthorImage] = useState(null);
  const [uploadNewsImage, setUploadNewsImage] = useState(null);

  const [authorPhoto, setAuthorPhoto] = useState('');
  const [newsImage, setNewsImage] = useState('');

  const [uaAuthorName, uaSetAuthor] = useState('');
  const [uaText, uaSetText] = useState('');
  const [uaTitle, uaSetTitle] = useState('');

  const [enAuthorName, enSetAuthor] = useState('');
  const [enText, enSetText] = useState('');
  const [enTitle, enSetTitle] = useState('');

  const [tabsValue, setTabsValue] = useState(0);
  const [checkboxes, setCheckboxes] = useState(checkboxStates);
  const [preferredLanguages, setPreferredLanguages] = useState([]);

  const handleTabsChange = (event, newValue) => {
    setTabsValue(newValue);
  };

  const handleCheckboxChange = (event) => {
    setCheckboxes({ ...checkboxes, [event.target.name]: event.target.checked });
  };

  const languageCheckboxes = languages.map((lang, index) => (
    <FormControlLabel
      key={lang}
      control={
        <Checkbox
          checked={checkboxes[lang]}
          onChange={handleCheckboxChange}
          name={lang}
          color='primary'
        />
      }
      label={lang}
    />
  ));

  const createArticle = (values) => {
    const article = {
      author: {
        name: [
          {
            lang: languages[0],
            value: values.uaAuthorName || null
          },
          {
            lang: languages[1],
            value: values.enAuthorName || null
          }
        ],
        image: values.authorPhoto
      },
      title: [
        {
          lang: languages[0],
          value: values.uaTitle || null
        },
        {
          lang: languages[1],
          value: values.enTitle || null
        }
      ],
      image: values.newsImage,
      text: [
        {
          lang: languages[0],
          value: values.uaText || null
        },
        {
          lang: languages[1],
          value: values.enText || null
        }
      ],
      languages: preferredLanguages,
      date: new Date().toISOString()
    };
    return article;
  };

  return {
    checkboxes,
    authorPhoto,
    newsImage,
    uaAuthorName,
    uaText,
    uaTitle,
    enAuthorName,
    enText,
    enTitle,
    preferredLanguages,
    tabsValue,
    setAuthorPhoto,
    setNewsImage,
    uaSetAuthor,
    uaSetText,
    uaSetTitle,
    enSetAuthor,
    enSetText,
    enSetTitle,
    setPreferredLanguages,
    setTabsValue,
    setCheckboxes,
    handleTabsChange,
    handleCheckboxChange,
    languageCheckboxes,
    createArticle,
    uploadAuthorImage,
    setUploadAuthorImage,
    uploadNewsImage,
    setUploadNewsImage
  };
};

export default useNewsHandlers;
