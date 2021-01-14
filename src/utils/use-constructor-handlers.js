import { useState } from 'react';
import { config } from '../configs';

const { languages } = config;

const useConstructorHandlers = () => {
  const [tabsValue, setTabsValue] = useState(0);
  const [imageName, setImageName] = useState('');
  const [constructorImg, setConstructorImg] = useState('');

  const handleTabsChange = (event, newValue) => {
    setTabsValue(newValue);
  };

  const createConstructor = (values) => {
    const newConstructorElement = {
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
      basePrice: +values.basePrice,
    };
    return newConstructorElement;
  };

  return {
    tabsValue,
    setTabsValue,
    handleTabsChange,
    createConstructor,
    imageName,
    setImageName,
    constructorImg,
    setConstructorImg
  };
};

export default useConstructorHandlers;
