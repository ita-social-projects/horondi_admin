import { useState } from 'react';
import { config } from '../configs';

const { languages } = config;

const useStrapsHandlers = () => {
  const [strapImage, setStrapImage] = useState('');
  const [color, setColor] = useState([]);
  const [upload, setUpload] = useState(null);
  const [imageName, setImageName] = useState('');

  const createStraps = (values) => ({
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
    features: {
      color: values.color
    },
    available: values.available,
    image: values.image,
    additionalPrice: {
      value: +values.additionalPrice,
      type: values.additionalPriceType
    },
    optionType: 'STRAP'
  });

  return {
    strapImage,
    setStrapImage,
    createStraps,
    upload,
    setUpload,
    imageName,
    setImageName,
    color,
    setColor
  };
};
export default useStrapsHandlers;
