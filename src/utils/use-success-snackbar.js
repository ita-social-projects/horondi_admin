import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  closeDialog,
  showDialog
} from '../redux/dialog-window/dialog-window.actions';
import { useStyles } from '../components/nav-menu/nav-menu.styles';

const useLocalStyles = makeStyles(() => ({
  list: {
    maxHeight: '15vh',
    width: '100%',
    overflow: 'auto'
  }
}));

const useSuccessSnackbar = () => {
  const dispatch = useDispatch();
  const styles = useLocalStyles();
  const navMenuStyles = useStyles();
  const openSuccessSnackbar = (
    onClickHandler,
    dialogContent,
    dialogTitle,
    showCancelButton = true,
    validationData = null,
    confirmTitle
  ) => {
    let content = dialogContent;
    if (validationData !== null && Object.keys(validationData).length) {
      content = (
        <div>
          Цей елемент є частиною
          <ul className={`${styles.list} ${navMenuStyles.drawerPaper}`}>
            {validationData.map((item) => (
              <li key={item.itemId} onClick={() => dispatch(closeDialog())}>
                <Link to={`/products/${item.itemId}`}>{item.itemName}</Link>
              </li>
            ))}
          </ul>
          <strong>
            Підтвердження приведе до видалення даного списку продуктів!
          </strong>
          <br />
          {dialogContent}
        </div>
      );
    }

    dispatch(
      showDialog({
        isOpen: true,
        dialogTitle,
        dialogContent: content,
        showCancelButton,
        onClickHandler,
        confirmTitle
      })
    );
  };

  return { openSuccessSnackbar };
};

export default useSuccessSnackbar;
