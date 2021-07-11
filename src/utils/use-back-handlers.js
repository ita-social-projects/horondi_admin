import { useState } from 'react';
import { config } from '../configs';

const { languages } = config;

const useBackHandlers = () => {
  const getIdFromItem = (item) => item._id;
  const [backColors, setBackColors] = useState([]);
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
    backMaterial: {
      material: values.backMaterial,
      color: values.backColors
    },
    available: values.available
  });

  return {
    getIdFromItem,
    backColors,
    setBackColors,
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
