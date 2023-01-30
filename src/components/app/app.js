import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { CssBaseline } from '@material-ui/core';
import Routes from '../../routes';
import { useStyles } from './app.styles';
import { checkUserByToken } from '../../redux/auth/auth.actions';
import { getEmailQuestionsPendingCount } from '../../redux/email-questions/email-questions.actions';
import { getFromLocalStorage } from '../../services/local-storage.service';
import { LOCAL_STORAGE } from '../../consts/local-storage';
import useDeleteValidation from '../../hooks/deleteValidation/useDeleteValidation';
import { getAllProductsDataForDeleteValidation } from '../../redux/products/products.operations';
import useDocTitleUpdate from '../../hooks/doc-title-update/useDocTitleUpdate';

const App = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const validatorMethods = useDeleteValidation(
    getAllProductsDataForDeleteValidation
  );
  const token = getFromLocalStorage(LOCAL_STORAGE.AUTH_ACCESS_TOKEN);

  useEffect(() => {
    dispatch(checkUserByToken());

    if (token) {
      dispatch(getEmailQuestionsPendingCount());
    }
  }, [dispatch, token]);

  useDocTitleUpdate();

  return (
    <CssBaseline>
      <div className={classes.root}>
        <Routes validatorMethods={validatorMethods} />
      </div>
    </CssBaseline>
  );
};

export default App;
