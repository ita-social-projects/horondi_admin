import { useState } from 'react';
import { config } from '../../configs';

const { languages } = config;

const useBottomHandlers = () => {
  const [colors, setColors] = useState([]);
  const [partImage, setPartImage] = useState('');
  const [partUpload, setPartUpload] = useState({});

  const createPart = (values) => {
    const part = {
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
        part.features = {
          color: values.color
        };
        break;

      case 'BOTTOM':
      case 'BASICS':
      case 'BACKS':
        part.features = {
          material: values.material,
          color: values.color
        };
        break;

      default:
        break;
    }

    return part;
  };

  return {
    colors,
    setColors,
    partImage,
    setPartImage,
    createPart,
    partUpload,
    setPartUpload
  };
};

export default useBottomHandlers;
