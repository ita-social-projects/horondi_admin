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
    languageCheckboxes
  };
};

export default useNewsHandlers;
