const useProductAddImages = ({
  toggleFieldsChanged,
  productImages,
  setProductImages
}) => {
  const handleImagesLoad = (files) => {
    toggleFieldsChanged(true);
    const arrAdd = [...productImages];
    if (files && files[0]) {
      files.forEach((file) => {
        arrAdd.push({ src: file, primary: false });
        setProductImages(arrAdd);
      });
    }
  };

  return { handleImagesLoad };
};

export default useProductAddImages;
