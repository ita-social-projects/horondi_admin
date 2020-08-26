import React, { useState } from 'react';
import { FormControlLabel, Checkbox } from '@material-ui/core';
import { config } from '../configs';

const { languages } = config;

const useNewsHandlers = () => {
  const checkboxStates = languages.reduce(
    (obj, lang) => ({ ...obj, [lang]: false }),
    {}
  );

  const [authorPhoto, setAuthorPhoto] = useState('');
  const [newsImage, setNewsImage] = useState('');
  const [newsVideo, setNewsVideo] = useState('');

  const [ukAuthorName, ukSetAuthor] = useState('');
  const [ukText, ukSetText] = useState('');
  const [ukTitle, ukSetTitle] = useState('');

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
      key={index}
      control={
        <Checkbox
          checked={checkboxes[`${lang}`]}
          onChange={handleCheckboxChange}
          name={`${lang}`}
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
            value: values.ukAuthorName || null
          },
          {
            lang: languages[1],
            value: values.enAuthorName || null
          }
        ],
        image: {
          small: values.authorPhoto
        }
      },
      title: [
        {
          lang: languages[0],
          value: values.ukTitle || null
        },
        {
          lang: languages[1],
          value: values.enTitle || null
        }
      ],
      text: [
        {
          lang: languages[0],
          value: values.ukText || null
        },
        {
          lang: languages[1],
          value: values.enText || null
        }
      ],
      images: {
        primary: {
          medium: values.newsImage
        }
      },
      languages: preferredLanguages,
      date: new Date().toISOString()
    };
    return article;
  };

  return {
    checkboxes,
    authorPhoto,
    newsImage,
    newsVideo,
    ukAuthorName,
    ukText,
    ukTitle,
    enAuthorName,
    enText,
    enTitle,
    preferredLanguages,
    tabsValue,
    setAuthorPhoto,
    setNewsImage,
    setNewsVideo,
    ukSetAuthor,
    ukSetText,
    ukSetTitle,
    enSetAuthor,
    enSetText,
    enSetTitle,
    setPreferredLanguages,
    setTabsValue,
    setCheckboxes,
    handleTabsChange,
    handleCheckboxChange,
    languageCheckboxes,
    createArticle
  };
};

export default useNewsHandlers;
