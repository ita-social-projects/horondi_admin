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

import LoadingBar from '../../../components/loading-bar';
import PromoCodeForm from '../promo-code-form/promo-code-form';

function PromoCodeEdit() {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const { SUCCESS_UPDATE_STATUS } = config.statuses;
  const { ERROR_BOUNDARY_STATUS } = config.errorStatuses;

  const { loading, error, data } = useQuery(getPromoCodeById, {
    variables: { id },
    fetchPolicy: 'no-cache'
  });

  const [updatePromoCodeHandler] = useMutation(updatePromoCode, {
    onCompleted: () => {
      dispatch(showSuccessSnackbar(SUCCESS_UPDATE_STATUS));
      history.push(pathToPromoCodesPage);
    },
    onError: (err) => {
      dispatch(showErrorSnackbar(ERROR_BOUNDARY_STATUS));
    }
  });

  const pathToPromoCodesPage = config.routes.pathToPromoCodes;

  if (loading || error) {
    return <LoadingBar />;
  }

  return (
    <PromoCodeForm
      pathToPromoCodesPage={pathToPromoCodesPage}
      addPromoCodeHandler={updatePromoCodeHandler}
      data={data.getPromoCodeById}
    />
  );
}

export default PromoCodeEdit;
