import { useState } from 'react';
import { config } from '../configs';

const { languages } = config;

const usePatternHandlers = () => {
  const [patternImage, setPatternImage] = useState('');
  const [upload, setUpload] = useState({});
  const [uploadConstructorImg, setUploadConstructorImg] = useState('');
  const [imageName, setImageName] = useState('');
  const [constructorImg, setConstructorImg] = useState('');

  const createPattern = (values) => ({
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

    description: [
      {
        lang: languages[0],
        value: values.uaDescription
      },
      {
        lang: languages[1],
        value: values.enDescription
      }
    ],
    optionType: values.optionType,
    constructorImg: values.patternConstructorImage,
    model: values.modelId,
    features: {
      material: values.material,
      handmade: values.handmade
    },
    available: values.available,
    absolutePrice:
      values.additionalPriceType === 'ABSOLUTE'
        ? +values.additionalPrice
        : null,
    relativePrice:
      values.additionalPriceType === 'RELATIVE' ? +values.additionalPrice : null
  });

  return {
    patternImage,
    setPatternImage,
    createPattern,
    upload,
    setUpload,
    imageName,
    setImageName,
    constructorImg,
    setConstructorImg,
    uploadConstructorImg,
    setUploadConstructorImg
  };
};

export default usePatternHandlers;
