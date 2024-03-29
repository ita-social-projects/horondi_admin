import { useState } from 'react';
import { config } from '../../configs';

const { languages } = config;

const useProductHandlers = () => {
  const getIdFromItem = (item) => item._id;

  const [models, setModels] = useState([]);
  const [innerColors, setInnerColors] = useState([]);
  const [mainColors, setMainColors] = useState([]);
  const [bottomColors, setBottomColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [productImages, setProductImages] = useState([]);

  const createProductInfo = (values) => ({
    name: [
      { lang: languages[0], value: values.uaName },
      { lang: languages[1], value: values.enName }
    ],
    description: [
      { lang: languages[0], value: values.uaDescription },
      { lang: languages[1], value: values.enDescription }
    ],
    mainMaterial: {
      material: values.mainMaterial,
      color: values.mainColor
    },
    innerMaterial: {
      material: values.innerMaterial,
      color: values.innerColor
    },
    bottomMaterial: {
      material: values.bottomMaterial,
      color: values.bottomColor
    }
  });

  return {
    innerColors,
    setInnerColors,
    mainColors,
    setMainColors,
    bottomColors,
    setBottomColors,
    models,
    sizes,
    setSizes,
    getIdFromItem,
    createProductInfo,
    setModels,
    productImages,
    setProductImages
  };
};

export default useProductHandlers;
