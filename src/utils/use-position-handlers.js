import { useState } from 'react';
import { config } from '../configs';

const { languages } = config;

const usePositionHandlers = () => {
  // const [pocketsImage, setPocketsImage] = useState('');
  // const [upload, setUpload] = useState(null);
  // const [imageName, setImageName] = useState('');

  const createPosition = (values) => ({
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
    // additionalPrice: values.additionalPrice,
    avaliable: values.avaliable
    // optionType: 'SIDE'
  });

  return {
    // pocketsImage,
    // setPocketsImage,
    createPosition,
    // upload,
    // setUpload,
    // imageName,
    // setImageName
  };
};
export default usePositionHandlers;
