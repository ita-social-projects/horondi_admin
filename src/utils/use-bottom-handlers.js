import { useState } from 'react';
import { config } from '../configs';

const { languages } = config;

const useBottomHandlers = () => {
  const getIdFromItem = (item) => item._id;
  const [color, setColor] = useState([]);
  const [bottomImage, setBottomImage] = useState('');
  const [upload, setUpload] = useState({});
  const [imageName, setImageName] = useState('');

  const createBottom = (values) => ({
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
    additionalPrice: values.additionalPrice,
    optionType: 'BOTTOM'
  });

  return {
    getIdFromItem,
    color,
    setColor,
    bottomImage,
    setBottomImage,
    createBottom,
    upload,
    setUpload,
    imageName,
    setImageName
  };
};

export default useBottomHandlers;