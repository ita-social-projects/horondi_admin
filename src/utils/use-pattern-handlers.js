import { useState } from 'react';

const usePatternHandlers = () => {
  const [large, setLarge] = useState('');
  const [medium, setMedium] = useState('');
  const [small, setSmall] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [ukName, setUkName] = useState('');
  const [enName, setEnName] = useState('');
  const [handmade, setHandmade] = useState(false);
  const [material, setMaterial] = useState('');
  const [available, setAvailable] = useState(false);
  const [ukDescription, setUkDescription] = useState('');
  const [enDescription, setEnDescription] = useState('');

  return {
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
    setEnDescription,
    large,
    setLarge,
    medium,
    setMedium,
    small,
    setSmall,
    thumbnail,
    setThumbnail
  };
};
export default usePatternHandlers;
