import { useState } from 'react';
import { config } from '../configs';

const { languages } = config;

const useBusinessHandlers = () => {
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
    languages,
    createBusinessPage,
    createBusinessTextTranslationFields,
    files,
    setFiles
  };
};

export default useBusinessHandlers;
