import React, { useState } from 'react';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import { config } from '../configs';

const { languages } = config;

const useBusinessHandlers = () => {
  const checkboxStates = languages.reduce(
    (obj, lang) => ({ ...obj, [lang]: false }),
    {}
  );

  const [code, setCode] = useState('');

  const [ukTitle, ukSetTitle] = useState('');
  const [ukText, ukSetText] = useState('');

  const [enTitle, enSetTitle] = useState('');
  const [enText, enSetText] = useState('');

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

  const createBusinessPage = (values) => ({
    code: values.code,
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
    ]
  });

  return {
    checkboxes,
    code,
    ukText,
    ukTitle,
    enText,
    enTitle,
    preferredLanguages,
    tabsValue,
    setCode,
    ukSetText,
    ukSetTitle,
    enSetText,
    enSetTitle,
    setPreferredLanguages,
    setTabsValue,
    setCheckboxes,
    handleTabsChange,
    handleCheckboxChange,
    languageCheckboxes,
    createBusinessPage
  };
};

export default useBusinessHandlers;
