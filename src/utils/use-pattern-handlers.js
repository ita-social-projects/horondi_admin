import { useState } from 'react';

const usePatternHandlers = () => {
  const [image, setImage] = useState('');
  const [ukName, setUkName] = useState('');
  const [enName, setEnName] = useState('');
  const [handmade, setHandmade] = useState(false);
  const [material, setMaterial] = useState('');
  const [available, setAvailable] = useState(false);
  const [ukDescription, setUkDescription] = useState('');
  const [enDescription, setEnDescription] = useState('');

  return {
    image,
    setImage,
    ukName,
    setUkName,
    enName,
    setEnName,
    handmade,
    setHandmade,
    material,
    setMaterial,
    available,
    setAvailable,
    ukDescription,
    enDescription,
    setUkDescription,
    setEnDescription
  };
};
export default usePatternHandlers;
