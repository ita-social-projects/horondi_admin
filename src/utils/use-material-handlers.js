import { useState } from 'react';
import { config } from '../configs';

const { languages } = config;

const useMaterialHandlers = () => {
  const [ukName, setUkName] = useState('');
  const [enName, setEnName] = useState('');
  const [ukDescription, setUkDescription] = useState('');
  const [enDescription, setEnDescription] = useState('');
  const [available, setAvailable] = useState(false);
  const [purpose, setPurpose] = useState('');
  const [colors, setColors] = useState([]);
  const [additionalPrice, setAdditionalPrice] = useState([]);
  const [tabsValue, setTabsValue] = useState(0);
  const [colorImagesToUpload,setColorImagesToUpload]=useState([])
  console.log(colorImagesToUpload);
  const handleTabsChange = (event, newValue) => {
    setTabsValue(newValue);
  };
  const createMaterial = (values) => {
    const newMaterial = {
      name: [
        {
          lang: languages[0],
          value: values.ukName || null
        },
        {
          lang: languages[1],
          value: values.enName || null
        }
      ],

      description: [
        {
          lang: languages[0],
          value: values.ukDescription || null
        },
        {
          lang: languages[1],
          value: values.enDescription || null
        }
      ],
      colors,
      available,
      purpose: values.purpose,
      additionalPrice
    };
    return newMaterial;
  };
  const setColorImages =(data)=>{
    const filtered = [...colorImagesToUpload,data]
    const set = [...new Set(filtered)]
    const test = [4,'4',2,4,5,6,6]
    console.log([...new Set(test)]);
    console.log(filtered);
    console.log('set',set);
    setColorImagesToUpload([...colorImagesToUpload,data])
  }

  return {
    ukName,
    setUkName,
    enName,
    setEnName,
    ukDescription,
    setUkDescription,
    enDescription,
    setEnDescription,
    available,
    setAvailable,
    purpose,
    setPurpose,
    additionalPrice,
    setAdditionalPrice,
    colors,
    setColors,
    createMaterial,
    tabsValue,
    handleTabsChange,
    colorImagesToUpload,
    setColorImages
  };
};

export default useMaterialHandlers;
