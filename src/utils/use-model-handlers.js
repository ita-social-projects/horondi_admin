import { useState } from 'react';
import { config } from '../configs';

const { languages } = config;

const useModelHandlers = () => {
  const [modelImage, setModelImage] = useState('');
  const [tabsValue, setTabsValue] = useState(0);
  const [upload, setUpload] = useState(null);
  const [imageName, setImageName] = useState('');

  const handleTabsChange = (_event, newValue) => {
    setTabsValue(newValue);
  };

  const createModel = (values) => ({
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
    priority: values.priority,
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
    category: values.category,
    sizes: values.sizes,
    show: values.show,
    availableForConstructor: values.availableForConstructor
  });

  return {
    modelImage,
    setModelImage,
    tabsValue,
    setTabsValue,
    handleTabsChange,
    createModel,
    upload,
    setUpload,
    imageName,
    setImageName
  };
};

export default useModelHandlers;
