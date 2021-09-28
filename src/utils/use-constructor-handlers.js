import { map } from 'lodash';
import { useState } from 'react';

const useConstructorHandlers = () => {
  const [tabsValue, setTabsValue] = useState(0);
  const [imageName, setImageName] = useState('');
  const [uploadConstructorImg, setUploadConstructorImg] = useState('');

  const handleTabsChange = (event, newValue) => {
    setTabsValue(newValue);
  };

  const createConstructor = (items) => {
    const pocketsWithRestrictions = map(items.restrictionsToAdd, (item) => ({
        currentPocketWithPosition: {
          pocket: item.pocket._id,
          position: item.position._id
        },
        otherPocketsWithAvailablePositions: [...item.currentRestrictions]
      }));

    return {
      name: items.model.name,
      model: items.model._id,
      basics: items.basicsToAdd,
      bottoms: items.bottomsToAdd,
      patterns: items.patternsToAdd,
      backs: items.backsToAdd,
      straps: items.strapsToAdd,
      closures: items.closuresToAdd,
      pocketsWithRestrictions
    };
  };

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
