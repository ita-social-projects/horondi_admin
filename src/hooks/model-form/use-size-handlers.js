import { useState } from 'react';
import { config } from '../../configs';

const { sizeAdd } = config.titles.sizesTitles;

const useSizeHandlers = (initialSizes) => {
  const [sizes, setSizes] = useState(initialSizes || []);
  const [sizesTouched, setSizesTouched] = useState(false);
  const [sizeFormExpanded, setSizeFormExpanded] = useState('');

  const onSizeSubmit = (newSize) => {
    setSizes((currentSizes) => {
      if (newSize._id.includes('size_')) {
        return [...currentSizes, newSize];
      }

      return currentSizes.map((size) =>
        size._id === newSize._id ? newSize : size
      );
    });
  };

  const onSizeDelete = (sizeIdToDelete) => {
    setSizes((currentSizes) =>
      currentSizes.filter((size) => size._id !== sizeIdToDelete)
    );
  };

  const handleExpandedChange = (sizeFormId) => (_event, isExpanded) => {
    if (sizeFormExpanded === sizeAdd) {
      setSizesTouched(true);
    }
    setSizeFormExpanded(isExpanded ? sizeFormId : '');
  };

  return {
    sizes,
    onSizeSubmit,
    onSizeDelete,
    sizesTouched,
    sizeFormExpanded,
    handleExpandedChange
  };
};

export default useSizeHandlers;
