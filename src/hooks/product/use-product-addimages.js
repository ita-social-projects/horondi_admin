import { useDispatch, useSelector } from 'react-redux';
import {
  setFilesToUpload,
  setPrimaryImageToUpload
} from '../../redux/products/products.actions';

const useProductAddImages = ({
  isEdit,
  additionalImagesDisplayed,
  setAdditionalImagesDisplayed,
  toggleFieldsChanged,
  additionalImages,
  setAdditionalImages,
  setProductImageDisplayed,
  setPrimaryImage
}) => {
  const dispatch = useDispatch();

  const products = useSelector(({ Products }) => Products);

  const handlePrimaryImageLoad = (files) => {
    toggleFieldsChanged(true);
    const reader = new FileReader();
    if ((files && files[0]) || isEdit) {
      reader.onload = (event) => {
        setProductImageDisplayed(event.target.result);
      };
      dispatch(setPrimaryImageToUpload([files[0]]));
      setPrimaryImage(files[0]);
      reader.readAsDataURL(files[0]);
    }
  };

  const handleAdditionalImagesLoad = (files) => {
    console.log(`files`, files);
    toggleFieldsChanged(true);
    if (files && files[0]) {
      files.forEach((file, index) => {
        // console.log("file in forEach", file)
        const reader = new FileReader();
        reader.onload = (event) => {
          const newArr = [...additionalImagesDisplayed];
          newArr.push(event.target.result);
          setAdditionalImagesDisplayed(newArr);
        };
        if (!isEdit) {
          const arrAdd = [...additionalImages];
          arrAdd.push(file);
          setAdditionalImages(arrAdd);
        } else {
          const arrUpdate = [...products?.upload];
          arrUpdate[index] = file;
          dispatch(setFilesToUpload(arrUpdate));
        }

        reader.readAsDataURL(file);
      });
    }
  };

  return { handleAdditionalImagesLoad, handlePrimaryImageLoad };
};

export default useProductAddImages;
