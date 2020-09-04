import { useState } from 'react';
import { config } from '../configs';

const { languages } = config;

const useMaterialHandlers = () => {
  const [ukName, setUkName] = useState('');
  const [enName, setEnName] = useState('');
  const [ukDescription, setUkDescription] = useState('');
  const [enDescription, setEnDescription] = useState('');
  const [available, setAvailable] = useState(false);
  const [purpose, setPurpose] = useState('');
  const [colors, setColors] = useState([]);
  const [additionalPrice, setAdditionalPrice] = useState([]);
  const [tabsValue, setTabsValue] = useState(0);

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
      available,
      purpose: values.purpose,
      additionalPrice
    };
    return newMaterial;
  };

  return {
    ukName,
    setUkName,
    enName,
    setEnName,
    ukDescription,
    setUkDescription,
    enDescription,
    setEnDescription,
    available,
    setAvailable,
    purpose,
    setPurpose,
    additionalPrice,
    setAdditionalPrice,
    colors,
    setColors,
    createMaterial,
    tabsValue,
    handleTabsChange
  };
};

export default useMaterialHandlers;
