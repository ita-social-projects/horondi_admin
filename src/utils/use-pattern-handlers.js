import { useState } from 'react';
import { config } from '../configs';

const { languages } = config;

const usePatternHandlers = () => {
  const [patternImage, setPatternImage] = useState('');
  const [ukName, setUkName] = useState('');
  const [enName, setEnName] = useState('');
  const [material, setMaterial] = useState('');
  const [available, setAvailable] = useState(false);
  const [handmade, setHandmade] = useState(false);
  const [tabsValue, setTabsValue] = useState(0);
  const [ukDescription, setUkDescription] = useState('');
  const [enDescription, setEnDescription] = useState('');
  console.log(patternImage);
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
      images: {
        medium: values.patternImage
      },
      available,
      handmade
    };
    return newPattern;
  };

  return {
    patternImage,
    setPatternImage,
    ukName,
    setUkName,
    ukDescription,
    setUkDescription,
    enDescription,
    setEnDescription,
    enName,
    setEnName,
    material,
    setMaterial,
    available,
    setAvailable,
    handmade,
    setHandmade,
    tabsValue,
    setTabsValue,
    handleTabsChange,
    createPattern
  };
};

export default usePatternHandlers;
