const useSizeHandlers = () => {
  const createSize = (values) => {
    const newSize = {
      name: values.name,
      heightInCm: parseInt(values.heightInCm),
      widthInCm: parseInt(values.widthInCm),
      depthInCm: parseInt(values.depthInCm),
      volumeInLiters: parseInt(values.volumeInLiters),
      weightInKg: parseFloat(values.weightInKg),
      available: values.available,
      additionalPrice: parseInt(values.valueUAH)
    };
    return newSize;
  };

  return {
    createSize
  };
};

export default useSizeHandlers;
