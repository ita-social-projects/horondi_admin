import { useDispatch } from 'react-redux';
import { showDialog } from '../redux/dialog-window/dialog-window.actions';

const useSuccessSnackbar = () => {
  const dispatch = useDispatch();

  const openSuccessSnackbar = (
    onClickHandler,
    dialogTitle,
    dialogContent,
    buttonTitle,
    showIcon
  ) => {
    dispatch(
      showDialog({
        isOpen: true,
        dialogTitle,
        dialogContent,
        buttonTitle,
        onClickHandler,
        showIcon
      })
    );
  };

  return { openSuccessSnackbar };
};

export default useSuccessSnackbar;
