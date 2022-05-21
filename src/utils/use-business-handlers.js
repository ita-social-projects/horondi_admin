import { useState } from 'react';
import { config } from '../configs';

const { languages } = config;

const useBusinessHandlers = () => {
  const [code, setCode] = useState('');

  const [uaTitle, uaSetTitle] = useState('');
  const [uaText, uaSetText] = useState('');

  const [enTitle, enSetTitle] = useState('');
  const [enText, enSetText] = useState('');

  const [files, setFiles] = useState([]);

  const createBusinessPage = (values) => ({
    code: values.code,
    languages: [...languages]
  });

  const createBusinessTextTranslationFields = (values) => ({
    ua: {
      title: values.uaTitle,
      text: values.uaText
    },
    en: {
      title: values.enTitle,
      text: values.enText
    }
  });

  return {
    code,
    uaText,
    uaTitle,
    enText,
    enTitle,
    setCode,
    uaSetText,
    uaSetTitle,
    enSetText,
    enSetTitle,
    languages,
    createBusinessPage,
    createBusinessTextTranslationFields,
    files,
    setFiles
  };
};

export default useBusinessHandlers;
