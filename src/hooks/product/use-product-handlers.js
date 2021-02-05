import { useState } from 'react';
import { useSelector } from 'react-redux';
import { config } from '../../configs';
import { selectProductDetails } from '../../redux/selectors/products.selectors';
import useProductSpecies from './use-product-species';

const { languages } = config;

const useProductHandlers = () => {
  const { details } = useSelector(selectProductDetails);
  const getIdFromItem = (item) => item._id;
  const { categories, materials, patterns, closures } = details;

  const [models, setModels] = useState([]);
  const [innerColors, setInnerColors] = useState([]);
  const [mainColors, setMainColors] = useState([]);
  const [bottomColors, setBottomColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [primaryImage, setPrimaryImage] = useState('');
  const [additionalImages, setAdditionalImages] = useState([]);
  const { categoriesNames, modelNames, patternsNames } = useProductSpecies();

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
    materials,
    closures,
    sizes,
    setSizes,
    modelNames,
    getIdFromItem,
    categories,
    categoriesNames,
    patterns,
    patternsNames,
    primaryImage,
    setPrimaryImage,
    additionalImages,
    setAdditionalImages,
    createProductInfo,
    setModels
  };
};

export default useProductHandlers;
