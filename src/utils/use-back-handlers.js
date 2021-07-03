import { useState } from 'react';
import { config } from '../configs';

const { languages } = config;

const useBackHandlers = () => {
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
    available: values.available
  });

  return {
    backImage,
    setBackImage,
    createBack,
    upload,
    setUpload,
    imageName,
    setImageName
    // constructorImg,
    // setConstructorImg,
    // uploadConstructorImg,
    // setUploadConstructorImg
  };
};

export default useBackHandlers;
