import { useState } from 'react';
import { config } from '../configs';

const { languages } = config;

const useConstructorFormHandlers = () => {
  const [colors, setColors] = useState([]);
  const [partItemImage, setPartItemImage] = useState('');
  const [partItemUpload, setPartItemUpload] = useState({});

  const createPartItem = (values) => {
    const partItem = {
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
      available: values.available,
      absolutePrice:
        values.additionalPriceType === 'ABSOLUTE'
          ? +values.additionalPrice
          : null,
      relativePrice:
        values.additionalPriceType === 'RELATIVE'
          ? +values.additionalPrice
          : null,
      optionType: values.optionType
    };

    switch (values.optionType) {
      case 'STRAPS':
      case 'CLOSURES':
      case 'POCKETS':
        partItem.features = {
          color: values.color
        };
        break;

      case 'BOTTOM':
      case 'BASICS':
      case 'BACKS':
        partItem.features = {
          material: values.material,
          color: values.color
        };
        break;

      default:
        break;
    }

    return partItem;
  };

  return {
    colors,
    setColors,
    partItemImage,
    setPartItemImage,
    createPartItem,
    partItemUpload,
    setPartItemUpload
  };
};

export default useConstructorFormHandlers;
