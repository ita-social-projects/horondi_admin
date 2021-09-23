import { useState } from 'react';
import { config } from '../configs';

const { languages } = config;

const useBackHandlers = () => {
  const getIdFromItem = (item) => item._id;
  const [color, setColor] = useState([]);
  const [backImage, setBackImage] = useState('');
  const [upload, setUpload] = useState({});
  const [imageName, setImageName] = useState('');

  const createBack = (values) => ({
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
      material: values.material,
      color: values.color
    },
    available: values.available,
    additionalPrice: {
      value: +values.additionalPrice,
      type: values.additionalPriceType
    },
    optionType: 'BACK'
  });

  return {
    getIdFromItem,
    color,
    setColor,
    backImage,
    setBackImage,
    createBack,
    upload,
    setUpload,
    imageName,
    setImageName
  };
};

export default useBackHandlers;
