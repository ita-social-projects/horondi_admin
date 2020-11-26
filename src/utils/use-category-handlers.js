import { useState } from 'react';
import { config } from '../configs';

const { languages } = config;

const useCategoryHandlers = () => {
  const [categoryImage, setCategoryImage] = useState('');
  const [tabsValue, setTabsValue] = useState(0);
  const [upload, setUpload] = useState({});
  const [imageName, setImageName] = useState('');

  const handleTabsChange = (event, newValue) => {
    setTabsValue(newValue);
  };

  const createCategory = (values) => {
    const newCategory = {
      name: [
        {
          lang: languages[0],
          value: values.ukName
        },
        {
          lang: languages[1],
          value: values.enName
        }
      ],
    }
    return newCategory;
  };

  return {
    categoryImage,
    setCategoryImage,
    tabsValue,
    setTabsValue,
    handleTabsChange,
    createCategory,
    upload,
    setUpload,
    imageName,
    setImageName
  };
};

export default useCategoryHandlers;
