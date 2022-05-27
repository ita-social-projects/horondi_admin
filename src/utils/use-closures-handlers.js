import { useState } from 'react';
import { config } from '../configs';

const { languages } = config;

const useClosuresHandlers = () => {
  const [closuresImage, setClosuresImage] = useState('');
  const [upload, setUpload] = useState(null);
  const [imageName, setImageName] = useState('');

  const createClosures = (values) => ({
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
    absolutePrice: +values.additionalPrice,
    available: values.available,
    optionType: 'CLOSURE'
  });

  return {
    closuresImage,
    setClosuresImage,
    createClosures,
    upload,
    setUpload,
    imageName,
    setImageName
  };
};
export default useClosuresHandlers;
