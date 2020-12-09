import { useState } from 'react';
import { config } from '../configs';

const { languages } = config;

const useColorHandlers = () => {
  const [available, setAvailable] = useState(false);
  const [tabsValue, setTabsValue] = useState(0);

  const handleTabsChange = (event, newValue) => {
    setTabsValue(newValue);
  };
  const createColor = (values) => {
    const newColor = {
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

      simpleName: [
        {
          lang: languages[0],
          value: values.uaSimpleName || null
        },
        {
          lang: languages[1],
          value: values.enSimpleName || null
        }
      ],
      code: +values.code,
      available: values.available
    };
    return newColor;
  };

  return {
    available,
    setAvailable,
    createColor,
    handleTabsChange,
    tabsValue
  };
};

export default useColorHandlers;
