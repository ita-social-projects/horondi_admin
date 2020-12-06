import { useDispatch } from 'react-redux';
import { showDialog } from '../redux/dialog-window/dialog-window.actions';

const useSuccessSnackbar = () => {
  const dispatch = useDispatch();

  const openSuccessSnackbar = (
    onClickHandler,
    dialogContent,
    showIcon,
    showCancelButton = true,
    buttonStyle = 'standart'
  ) => {
    dispatch(
      showDialog({
        isOpen: true,
        dialogContent,
        onClickHandler,
        showIcon,
        showCancelButton,
        buttonStyle
      })
    );
  };

  return { openSuccessSnackbar };
};

export default useSuccessSnackbar;
