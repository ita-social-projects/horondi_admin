import { useState } from 'react';
import { config } from '../configs';

const { languages } = config;

const useStrapsHandlers = () => {
  const [strapsImage, setStrapsImage] = useState('');
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
      color: values.color[0]
    },
    available: values.available,
    additionalPrice: values.additionalPrice,
    optionType: 'STRAP'
  });

  return {
    strapsImage,
    setStrapsImage,
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
