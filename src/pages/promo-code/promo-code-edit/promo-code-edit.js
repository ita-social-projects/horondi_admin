import React from 'react';
import { useParams, useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { useMutation, useQuery } from '@apollo/client';

import { showSuccessSnackbar } from '../../../redux/snackbar/snackbar.actions';
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

  const onCompletedHandler = () => {
    dispatch(showSuccessSnackbar('Успішно змінено'));
  };

  const [updatePromoCodeHandler] = useMutation(updatePromoCode, {
    onCompleted: onCompletedHandler
  });

  const pathToPromoCodesPage = config.routes.pathToPromoCodes;

  const goToPromoPage = () => {
    history.push(pathToPromoCodesPage);
  };

  if (loading || error) {
    return <LoadingBar />;
  }

  return (
    <PromoCodeForm
      data={data.getPromoCodeById}
      promoValidationSchema={promoValidationSchema}
      pathToPromoCodesPage={pathToPromoCodesPage}
      addPromoCodeHandler={updatePromoCodeHandler}
      goToPromoPage={goToPromoPage}
    />
  );
}

export default PromoCodeEdit;
