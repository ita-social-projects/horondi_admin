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
        // const reader = new FileReader();
        // reader.onload = (event) => {
        //   newArr.push(event.target.result);
        //   setAdditionalImagesDisplayed(newArr);
        // };
        arrAdd.push({ src: file, primary: false });
        setProductImages(arrAdd);
        // if (!isEdit) dispatch(setFilesToUpload(arrAdd));

        // reader.readAsDataURL(file);
      });
    }
  };

  return { handleImagesLoad };
};

export default useProductAddImages;
