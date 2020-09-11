import { useState } from 'react';
import { config } from '../configs';

const { languages } = config;

const useMaterialHandlers = () => {
  const [ukName, setUkName] = useState('');
  const [enName, setEnName] = useState('');
  const [ukSimpleName, setUkSimpleName] = useState('');
  const [enSimpleName, setEnSimpleName] = useState('');
  const [available, setAvailable] = useState(false);
  const [code, setCode] = useState('');
  const [tabsValue, setTabsValue] = useState(0);
  const [colorImage, setColorImage] = useState('');

  const handleTabsChange = (event, newValue) => {
    setTabsValue(newValue);
  };
  const createColor = (values) => {
    const newColor = {
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

      simpleName: [
        {
          lang: languages[0],
          value: values.ukSimpleName || null
        },
        {
          lang: languages[1],
          value: values.enSimpleName || null
        }
      ],
      images: {
        medium: values.colorImage
      },
      code: +values.code,
      available
    };
    return newColor;
  };

  return {
    ukName,
    setUkName,
    enName,
    setEnName,
    ukSimpleName,
    setUkSimpleName,
    enSimpleName,
    setEnSimpleName,
    available,
    setAvailable,
    createColor,
    code,
    setCode,
    colorImage,
    setColorImage,
    handleTabsChange,
    tabsValue
  };
};

export default useMaterialHandlers;
