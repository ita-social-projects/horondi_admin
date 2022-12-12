import React from 'react';
import { useParams, useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { useMutation, useQuery } from '@apollo/client';

import {
  showErrorSnackbar,
  showSuccessSnackbar
} from '../../../redux/snackbar/snackbar.actions';
import { getPromoCodeById } from '../operations/promo-code.queries';
import { updatePromoCode } from '../operations/promo-code.mutation';
import { config } from '../../../configs';
import { promoValidationSchema } from '../../../validations/promo-code/promo-code-validation';

import LoadingBar from '../../../components/loading-bar';
import PromoCodeForm from '../promo-code-form/promo-code-form';

function PromoCodeEdit() {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const { loading, error, data } = useQuery(getPromoCodeById, {
    variables: { id },
    fetchPolicy: 'no-cache'
  });

  const [updatePromoCodeHandler] = useMutation(updatePromoCode, {
    onCompleted: (data) => {
      if (data.updatePromoCode.message) {
        dispatch(showErrorSnackbar(`Помилка: ${data.updatePromoCode.message}`));
      } else {
        dispatch(showSuccessSnackbar('Успішно змінено'));
        history.push(pathToPromoCodesPage);
      }
    },
    onError: (err) => {
      dispatch(showErrorSnackbar(`Помилка: ${err.message}`));
    }
  });

  const pathToPromoCodesPage = config.routes.pathToPromoCodes;

  if (loading || error) {
    return <LoadingBar />;
  }

  return (
    <PromoCodeForm
      promoValidationSchema={promoValidationSchema}
      pathToPromoCodesPage={pathToPromoCodesPage}
      addPromoCodeHandler={updatePromoCodeHandler}
      data={data.getPromoCodeById}
    />
  );
}

export default PromoCodeEdit;
