import { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { closeDialog } from '../../redux/dialog-window/dialog-window.actions';
import useSuccessSnackbar from '../../utils/use-success-snackbar';
import messages from '../../configs/messages';
import buttonTitles from '../../configs/button-titles';

const { BACK_BUTTON_WARNING_MESSAGE } = messages;
const { EXIT_WITHOUT_SAVING } = buttonTitles;

export const useUnsavedChangesHandler = (values) => {
  const [isFieldsChanged, toggleFieldsChanged] = useState(false);
  const [isMountedFirst, toggleIsMountedFirst] = useState(false);

  const { openSuccessSnackbar } = useSuccessSnackbar();
  const dispatch = useDispatch();
  const unblock = useRef(null);
  const history = useHistory();

  useEffect(() => {
    if (isMountedFirst) toggleFieldsChanged(true);
  }, [values, isMountedFirst]);

  useEffect(() => toggleIsMountedFirst(true), []);

  useEffect(() => {
    if (isFieldsChanged) {
      unblock.current = history.block((location) => {
        const moveAction = () => {
          dispatch(closeDialog());
          if (unblock.current) {
            unblock.current();
            history.push(location.pathname);
          }
        };

        openSuccessSnackbar(
          moveAction,
          BACK_BUTTON_WARNING_MESSAGE,
          EXIT_WITHOUT_SAVING
        );

        return false;
      });
    }
    return () => {
      if (unblock.current) unblock.current();
    };
  }, [history, isFieldsChanged, dispatch]);

  return unblock.current;
};
