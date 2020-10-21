import { useState } from 'react';
import { config } from '../configs';

const { languages } = config;

const useMaterialHandlers = () => {
  const [tabsValue, setTabsValue] = useState(0);
  const [colorImagesToUpload, setColorImagesToUpload] = useState([]);
  const [colorImages, setColorImages] = useState([]);
  const [colors, setColors] = useState([]);

  const handleTabsChange = (event, newValue) => {
    setTabsValue(newValue);
  };

  const createMaterial = (values) => {
    const newMaterial = {
      name: [
        {
          lang: languages[0],
          value: values.ukName || null
        },
        {
          lang: languages[1],
          value: values.enName || null
        }
      ],

      description: [
        {
          lang: languages[0],
          value: values.ukDescription || null
        },
        {
          lang: languages[1],
          value: values.enDescription || null
        }
      ],
      colors,
      available: values.available,
      purpose: values.purpose,
      additionalPrice: +values.additionalPrice
    };
    return newMaterial;
  };
  const addNewColorImages = (data) => {
    setColorImages([...colorImages, data]);
  };
  return {
    createMaterial,
    tabsValue,
    handleTabsChange,
    colorImagesToUpload,
    setColorImagesToUpload,
    colorImages,
    addNewColorImages,
    setTabsValue,
    setColors
  };
};

export default useMaterialHandlers;
