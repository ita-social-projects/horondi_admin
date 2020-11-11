import { useState } from 'react';
import { config } from '../configs';

const { languages } = config;

const useHeaderHandlers = () => {
  const [tabsValue, setTabsValue] = useState(0);

  const handleTabsChange = (event, newValue) => {
    setTabsValue(newValue);
  };

  const createHeader = (values) => {
    const newHeader = {
      title: [
        {
          lang: languages[0],
          value: values.ukName
        },
        {
          lang: languages[1],
          value: values.enName
        }
      ],
      priority: values.priority,
      link: values.link
    };
    return newHeader;
  };

  return {
    tabsValue,
    setTabsValue,
    handleTabsChange,
    createHeader
  };
};

export default useHeaderHandlers;
