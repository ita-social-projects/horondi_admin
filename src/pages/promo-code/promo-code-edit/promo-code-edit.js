import React from 'react';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useMutation, useQuery } from '@apollo/client';
import { getPromoCodeById } from '../operations/promo-code.queries';
import { updatePromoCode } from '../operations/promo-code.mutation';

import {
  setSnackBarMessage,
  setSnackBarSeverity,
  setSnackBarStatus
} from '../../../redux/snackbar/snackbar.actions';

import { config } from '../../../configs';
import { promoValidationSchema } from '../../../validations/promo-code/promo-code-validation';
import { getFromLocalStorage } from '../../../services/local-storage.service';
import { LOCAL_STORAGE } from '../../../consts/local-storage';

import LoadingBar from '../../../components/loading-bar';
import PromoCodeForm from '../promo-code-form/promo-code-form';

function PromoCodeEdit() {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const token = getFromLocalStorage(LOCAL_STORAGE.AUTH_ACCESS_TOKEN);

  const { loading, data } = useQuery(getPromoCodeById, {
    variables: { id },
    fetchPolicy: 'no-cache',
    context: {
      headers: { token }
    }
  });

  const onCompletedHandler = () => {
    dispatch(setSnackBarSeverity('success'));
    dispatch(setSnackBarMessage('Успішно додано'));
    dispatch(setSnackBarStatus(true));
  };

  const [updatePromoCodeHandler] = useMutation(updatePromoCode, {
    onCompleted: onCompletedHandler,
    context: {
      headers: {
        token
      }
    }
  });

  const promoCode = data?.getPromoCodeById;
  const pathToPromoCodesPage = config.routes.pathToPromoCodes;

  const goToPromoPage = () => {
    history.push(pathToPromoCodesPage);
  };

  if (loading) {
    return <LoadingBar />;
  }

  return (
    <>
      <PromoCodeForm
        goToPromoPage={goToPromoPage}
        pathToPromoCodesPage={pathToPromoCodesPage}
        initialState={promoCode}
        promoValidationSchema={promoValidationSchema}
        addPromoCodeHandler={updatePromoCodeHandler}
      />
    </>
  );
}

export default PromoCodeEdit;
