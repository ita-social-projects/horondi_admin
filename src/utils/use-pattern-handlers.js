import { useState } from 'react';
import { config } from '../configs';

const { languages } = config;

const usePatternHandlers = () => {
  const [patternImage, setPatternImage] = useState('');
  const [tabsValue, setTabsValue] = useState(0);
  const [upload, setUpload] = useState({});
  const [imageName, setImageName] = useState('');

  const handleTabsChange = (event, newValue) => {
    setTabsValue(newValue);
  };

  const createPattern = (values) => {
    const newPattern = {
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

      description: [
        {
          lang: languages[0],
          value: values.ukDescription
        },
        {
          lang: languages[1],
          value: values.enDescription
        }
      ],
      material: values.material,
      available: values.available,
      handmade: values.handmade
    };
    return newPattern;
  };

  return {
    patternImage,
    setPatternImage,
    tabsValue,
    setTabsValue,
    handleTabsChange,
    createPattern,
    upload,
    setUpload,
    imageName,
    setImageName
  };
};

export default usePatternHandlers;
