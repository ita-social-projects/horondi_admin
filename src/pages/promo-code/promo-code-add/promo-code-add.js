import React from 'react';
import { useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { config } from '../../../configs';
import { addPromoCodes } from '../operations/promo-code.mutation';
import {
  setSnackBarMessage,
  setSnackBarSeverity,
  setSnackBarStatus
} from '../../../redux/snackbar/snackbar.actions';
import { getFromLocalStorage } from '../../../services/local-storage.service';
import { LOCAL_STORAGE } from '../../../consts/local-storage';
import { promoValidationSchema } from '../../../validations/promo-code/promo-code-validation';

import PromoCodeForm from '../promo-code-form/promo-code-form';

const PromoCodeAdd = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const token = getFromLocalStorage(LOCAL_STORAGE.AUTH_ACCESS_TOKEN);
  const pathToPromoCodesPage = config.routes.pathToPromoCodes;
  const initialState = {
    code: '',
    dateTo: '',
    dateFrom: '',
    discount: '',
    category: ['All']
  };

  const onCompletedHandler = () => {
    dispatch(setSnackBarSeverity('success'));
    dispatch(setSnackBarMessage('Успішно додано'));
    dispatch(setSnackBarStatus(true));
  };

  const [addPromoCodeHandler] = useMutation(addPromoCodes, {
    onCompleted: onCompletedHandler,
    context: {
      headers: {
        token
      }
    }
  });

  const goToPromoPage = () => {
    history.push(pathToPromoCodesPage);
  };

  return (
    <PromoCodeForm
      initialState={initialState}
      pathToPromoCodesPage={pathToPromoCodesPage}
      goToPromoPage={goToPromoPage}
      addPromoCodeHandler={addPromoCodeHandler}
      promoValidationSchema={promoValidationSchema}
    />
  );
};

export default PromoCodeAdd;
