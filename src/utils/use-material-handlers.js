import { useState } from 'react';
import { config } from '../configs';

const { languages } = config;

const useMaterialHandlers = () => {
  const [tabsValue, setTabsValue] = useState(0);

  const handleTabsChange = (event, newValue) => {
    setTabsValue(newValue);
  };

  const createMaterial = (values) => ({
    name: [
      {
        lang: languages[0],
        value: values.uaName || null
      },
      {
        lang: languages[1],
        value: values.enName || null
      }
    ],

    description: [
      {
        lang: languages[0],
        value: values.uaDescription || null
      },
      {
        lang: languages[1],
        value: values.enDescription || null
      }
    ],
    available: values.available,
    purpose: values.purpose,
    additionalPrice: {
      value: +values.additionalPrice,
      type: values.additionalPriceType
    },
    colors: values.colors
  });

  return {
    createMaterial,
    tabsValue,
    handleTabsChange,
    setTabsValue
  };
};

export default useMaterialHandlers;
