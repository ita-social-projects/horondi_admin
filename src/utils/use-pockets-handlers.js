import { useState } from 'react';
import { config } from '../configs';

const { languages } = config;

const usePocketsHandlers = () => {
  const [pocketsImage, setPocketsImage] = useState('');
  const [upload, setUpload] = useState(null);
  const [imageName, setImageName] = useState('');

  const createPockets = (values) => ({
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
    additionalPrice: values.additionalPrice,
    restriction: values.restriction,
    optionType: 'SIDE'
  });

  return {
    pocketsImage,
    setPocketsImage,
    createPockets,
    upload,
    setUpload,
    imageName,
    setImageName
  };
};
export default usePocketsHandlers;
