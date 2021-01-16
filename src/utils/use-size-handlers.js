const useSizeHandlers = () => {
  const createSize = (values) => {
    const newSize = {
      heightInCm: parseInt(values.heightInCm),
      name: values.name,
      widthInCm: parseInt(values.widthInCm),
      depthInCm: parseInt(values.depthInCm),
      weightInKg: parseFloat(values.weightInKg),
      volumeInLiters: parseInt(values.volumeInLiters)
    };
    return newSize;
  };

  return {
    createSize
  };
};

export default useSizeHandlers;
