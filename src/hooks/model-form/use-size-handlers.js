import { useState } from 'react';

const useSizeHandlers = (defaultSizes) => {
  const [sizes, setSizes] = useState(defaultSizes || []);

  const onSizeSubmit = (newSize) => {
    setSizes((currentSizes) => {
      const sizeIdx = currentSizes.findIndex(
        (size) => newSize._id && size._id === newSize._id
      );

      if (sizeIdx >= 0) {
        return currentSizes.map((size, idx) =>
          idx === sizeIdx ? newSize : size
        );
      }
      return [...currentSizes, newSize];
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
