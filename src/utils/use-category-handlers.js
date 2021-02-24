import { useState } from 'react';
import { config } from '../configs';

const { languages } = config;

const useCategoryHandlers = () => {
  const [categoryImage, setCategoryImage] = useState('');
  const [upload, setUpload] = useState({});
  const [imageName, setImageName] = useState('');

  const createCategory = (values) => ({
    name: [
      {
        lang: languages[0],
        value: values.uaName
      },
      {
        lang: languages[1],
        value: values.enName
      }
    ],
    code: values.code
  });

  return {
    categoryImage,
    setCategoryImage,
    createCategory,
    upload,
    setUpload,
    imageName,
    setImageName
  };
};
export default useCategoryHandlers;
