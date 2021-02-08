import { useState } from 'react';
import { config } from '../configs';

const { languages } = config;

const useConstructorHandlers = () => {
  const [tabsValue, setTabsValue] = useState(0);
  const [imageName, setImageName] = useState('');
  const [uploadConstructorImg, setUploadConstructorImg] = useState('');

  const handleTabsChange = (event, newValue) => {
    setTabsValue(newValue);
  };

  const createConstructor = (values) => ({
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
    image: values.image,
    material: values.material,
    color: values.color,
    available: values.available,
    default: values.default,
    basePrice: +values.basePrice
  });

  return {
    tabsValue,
    setTabsValue,
    handleTabsChange,
    createConstructor,
    imageName,
    setImageName,
    uploadConstructorImg,
    setUploadConstructorImg
  };
};

export default useConstructorHandlers;
