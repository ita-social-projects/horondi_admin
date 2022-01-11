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

  const handleAdditionalImagesLoad = (files, index) => {
    const file = files[0];
    const reader = new FileReader();
    toggleFieldsChanged(true);
    if (files && files[0]) {
      reader.onload = (event) => {
        const newArr = [...additionalImagesDisplayed];
        newArr[index] = event.target.result;
        setAdditionalImagesDisplayed(newArr);
      };
      if (!isEdit) {
        const arrAdd = [...additionalImages];
        arrAdd[index] = file;
        setAdditionalImages(arrAdd);
      } else {
        const arrUpdate = [...products?.upload];
        arrUpdate[index] = file;
        dispatch(setFilesToUpload(arrUpdate));
      }
      reader.readAsDataURL(files[0]);
    }
  };

  return { handleAdditionalImagesLoad, handlePrimaryImageLoad };
};

export default useProductAddImages;
