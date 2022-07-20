import { useState } from 'react';

const useSizeHandlers = (initialSizes) => {
  const [sizes, setSizes] = useState(initialSizes || []);

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

  return {
    sizes,
    onSizeSubmit,
    onSizeDelete
  };
};

export default useSizeHandlers;
