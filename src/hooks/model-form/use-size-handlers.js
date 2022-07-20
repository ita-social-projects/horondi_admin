import { useState, useEffect } from 'react';

const useSizeHandlers = (initialSizes, setFieldValue) => {
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

  useEffect(() => {
    const updatedSizes = sizes.map(({ _id, ...size }) =>
      _id.includes('size_') ? size : { _id, ...size }
    );
    setFieldValue('sizes', updatedSizes);
  }, [sizes, setFieldValue]);

  return {
    sizes,
    onSizeSubmit,
    onSizeDelete
  };
};

export default useSizeHandlers;
