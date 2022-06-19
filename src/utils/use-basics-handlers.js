import { useState } from 'react';
import { config } from '../configs';

const { languages } = config;

const useBasicsHandlers = () => {
  const [color, setColor] = useState([]);
  const [basicImage, setBasicImage] = useState('');
  const [upload, setUpload] = useState(null);
  const [imageName, setImageName] = useState('');

  const createBasic = (values) => ({
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
    features: {
      material: values.material,
      color: values.color
    }
  });

  return {
    createBasic,
    basicImage,
    setBasicImage,
    upload,
    setUpload,
    imageName,
    setImageName,
    color,
    setColor
  };
};

export default useBasicsHandlers;
