import { useState } from 'react';

const useConstructorHandlers = () => {
  const [tabsValue, setTabsValue] = useState(0);
  const [imageName, setImageName] = useState('');
  const [uploadConstructorImg, setUploadConstructorImg] = useState('');

  const handleTabsChange = (_event, newValue) => {
    setTabsValue(newValue);
  };

  const createConstructor = (items) => ({
    name: items.model.name,
    model: items.model._id,
    basics: items.basicsToAdd,
    bottoms: items.bottomsToAdd,
    patterns: items.patternsToAdd,
    backs: items.backsToAdd,
    straps: items.strapsToAdd,
    closures: items.closuresToAdd,
    pockets: items.pocketsToAdd,
    basePrice: items.basePriceToAdd
  });

  return {
    tabsValue,
    setTabsValue,
    handleTabsChange,
    createConstructor,
    imageName,
    setImageName,
    uploadConstructorImg,
    setUploadConstructorImg
  };
};

export default useConstructorHandlers;
