import { useState } from 'react';
import { config } from '../configs';

const { languages } = config;

const useStrapsHandlers = () => {
  const [strapsImage, setStrapsImage] = useState('');
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
    additionalPrice: values.additionalPrice,
    restriction: values.restriction,
    optionType: 'STRAP',
    positions: values.positions
  });

  return {
    strapsImage,
    setStrapsImage,
    createStraps,
    upload,
    setUpload,
    imageName,
    setImageName
  };
};
export default useStrapsHandlers;
