import { useDispatch, useSelector } from 'react-redux';
import {
  setFilesToUpload,
  setPrimaryImageToUpload
} from '../../redux/products/products.actions';

function useProductAddImages(
  isEdit,
  additionalImagesDisplayed,
  setAdditionalImagesDisplayed,
  toggleFieldsChanged,
  additionalImages,
  setAdditionalImages,
  setProductImageDisplayed,
  setPrimaryImage
) {
  const dispatch = useDispatch();

  const products = useSelector(({ Products }) => Products);

  const handlePrimaryImageLoad = (e) => {
    toggleFieldsChanged(true);
    const reader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      reader.onload = (event) => {
        setProductImageDisplayed(event.target.result);
      };
      setPrimaryImage(e.target.files[0]);
      reader.readAsDataURL(e.target.files[0]);
    }
    if (isEdit) {
      reader.onload = (event) => {
        setProductImageDisplayed(event.target.result);
      };
      dispatch(setPrimaryImageToUpload([e.target.files[0]]));
    }
  };

  const handleAdditionalImagesLoad = (e, index) => {
    const file = e?.target?.files[0];
    const reader = new FileReader();
    if (e.target.files && e.target.files[0] && !isEdit) {
      reader.onload = (event) => {
        const newArr = [...additionalImagesDisplayed];
        newArr[index] = event.target.result;
        setAdditionalImagesDisplayed(newArr);
      };
      e.persist();
      toggleFieldsChanged(true);
      const arr = [...additionalImages];
      arr[index] = file;
      setAdditionalImages(arr);
      reader.readAsDataURL(e.target.files[0]);
    }
    if (isEdit) {
      reader.onload = (event) => {
        const newArr = [...additionalImagesDisplayed];
        newArr[index] = event.target.result;
        setAdditionalImagesDisplayed(newArr);
      };
      e.persist();
      toggleFieldsChanged(true);
      const arr = [...products?.upload];
      arr[index] = file;
      dispatch(setFilesToUpload(arr));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return { handleAdditionalImagesLoad, handlePrimaryImageLoad };
}

export default useProductAddImages;
