import { useState } from 'react';
import { config } from '../configs';

const { languages } = config;

const useNewsHandlers = () => {
  const [uploadAuthorImage, setUploadAuthorImage] = useState(null);
  const [uploadNewsImage, setUploadNewsImage] = useState(null);

  const [uaAuthorName, uaSetAuthor] = useState('');
  const [uaText, uaSetText] = useState('');
  const [uaTitle, uaSetTitle] = useState('');

  const [enAuthorName, enSetAuthor] = useState('');
  const [enText, enSetText] = useState('');
  const [enTitle, enSetTitle] = useState('');

  const createArticle = (values) => ({
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
    languages: [...languages],
    date: new Date().toISOString()
  });

  return {
    uaAuthorName,
    uaText,
    uaTitle,
    enAuthorName,
    enText,
    enTitle,
    uaSetAuthor,
    uaSetText,
    uaSetTitle,
    enSetAuthor,
    enSetText,
    enSetTitle,
    createArticle,
    uploadAuthorImage,
    setUploadAuthorImage,
    uploadNewsImage,
    setUploadNewsImage
  };
};

export default useNewsHandlers;
