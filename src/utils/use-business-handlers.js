import { useState } from 'react';
import { config } from '../configs';

const { languages } = config;

const useBusinessHandlers = () => {
  const [code, setCode] = useState('');

  const [ukTitle, ukSetTitle] = useState('');
  const [ukText, ukSetText] = useState('');

  const [enTitle, enSetTitle] = useState('');
  const [enText, enSetText] = useState('');

  const [files, setFiles] = useState([]);
  const [tabsValue, setTabsValue] = useState(0);

  const handleTabsChange = (event, newValue) => {
    setTabsValue(newValue);
  };

  const createBusinessPage = (values) => ({
    code: values.code,
    title: [
      {
        lang: languages[0],
        value: values.ukTitle
      },
      {
        lang: languages[1],
        value: values.enTitle
      }
    ],
    text: [
      {
        lang: languages[0],
        value: values.ukText
      },
      {
        lang: languages[1],
        value: values.enText
      }
    ],
    languages: [...languages]
  });

  return {
    code,
    ukText,
    ukTitle,
    enText,
    enTitle,
    tabsValue,
    setCode,
    ukSetText,
    ukSetTitle,
    enSetText,
    enSetTitle,
    setTabsValue,
    handleTabsChange,
    languages,
    createBusinessPage,
    files,
    setFiles
  };
};

export default useBusinessHandlers;
