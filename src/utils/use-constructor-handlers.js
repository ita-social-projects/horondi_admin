import { map } from 'lodash';
import { useState } from 'react';

const useConstructorHandlers = () => {
  const [tabsValue, setTabsValue] = useState(0);
  const [imageName, setImageName] = useState('');
  const [uploadConstructorImg, setUploadConstructorImg] = useState('');

  const handleTabsChange = (_event, newValue) => {
    setTabsValue(newValue);
  };

  const createConstructor = (items) => {
    const pocketsWithRestrictions = map(items.restrictionsToAdd, (item) => {
      const otherPocketsWithAvailablePositions = map(
        item.otherPocketsWithAvailablePositions,
        (otherPocket) => ({
          pocket: otherPocket.pocket._id,
          position: otherPocket.position._id
        })
      );
      return {
        currentPocketWithPosition: {
          pocket: item.currentPocketWithPosition.pocket._id,
          position: item.currentPocketWithPosition.position._id
        },
        otherPocketsWithAvailablePositions
      };
    });

    return {
      name: items.model.name,
      model: items.model._id,
      basics: items.basicsToAdd,
      bottoms: items.bottomsToAdd,
      patterns: items.patternsToAdd,
      backs: items.backsToAdd,
      straps: items.strapsToAdd,
      closures: items.closuresToAdd,
      pocketsWithRestrictions,
      basePrice: items.basePriceToAdd
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
