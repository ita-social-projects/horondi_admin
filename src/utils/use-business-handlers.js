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
    title: [
      {
        lang: languages[0],
        value: values.uaTitle
      },
      {
        lang: languages[1],
        value: values.enTitle
      }
    ],
    text: [
      {
        lang: languages[0],
        value: values.uaText
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
    files,
    setFiles
  };
};

export default useBusinessHandlers;
