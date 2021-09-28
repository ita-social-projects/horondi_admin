import { useState } from 'react';
import { config } from '../configs';

const { languages } = config;

const useHomePageSlideHandlers = () => {
  const [slideImage, setSlideImage] = useState('');
  const [tabsValue, setTabsValue] = useState(0);
  const [upload, setUpload] = useState({});
  const [imageName, setImageName] = useState('');
  const [uploadImage, setUploadImage] = useState({
    imageUrl: ''
  });

  const handleTabsChange = (event, newValue) => {
    setTabsValue(newValue);
  };

  const createSlide = (values) => ({
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

    description: [
      {
        lang: languages[0],
        value: values.uaDescription
      },
      {
        lang: languages[1],
        value: values.enDescription
      }
    ],
    order: values.order,
    show: values.show,
    link: values.link
  });

  return {
    slideImage,
    setSlideImage,
    tabsValue,
    setTabsValue,
    handleTabsChange,
    createSlide,
    upload,
    setUpload,
    imageName,
    setImageName,
    uploadImage,
    setUploadImage
  };
};

export default useHomePageSlideHandlers;
