import React from 'react';
import { useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { config } from '../../../configs';
import { addPromoCodes } from '../operations/promo-code.mutation';
import {
  showErrorSnackbar,
  showSuccessSnackbar
} from '../../../redux/snackbar/snackbar.actions';
import { getFromLocalStorage } from '../../../services/local-storage.service';
import { LOCAL_STORAGE } from '../../../consts/local-storage';
import { promoCodeErrorMessages } from '../../../configs/error-modal-messages';

import PromoCodeForm from '../promo-code-form/promo-code-form';

const PromoCodeAdd = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const token = getFromLocalStorage(LOCAL_STORAGE.AUTH_ACCESS_TOKEN);
  const pathToPromoCodesPage = config.routes.pathToPromoCodes;
  const { SUCCESS_ADD_STATUS } = config.statuses;
  const { ERROR_BOUNDARY_STATUS } = config.errorStatuses;

  const [addPromoCodeHandler] = useMutation(addPromoCodes, {
    onCompleted: () => {
      dispatch(showSuccessSnackbar(SUCCESS_ADD_STATUS));
      history.push(pathToPromoCodesPage);
    },
    context: {
      headers: {
        token
      }
    },
    onError: (err) => {
      dispatch(
        showErrorSnackbar(
          `${promoCodeErrorMessages[err.message] || ERROR_BOUNDARY_STATUS}`
        )
      );
    }
  });

  return (
    <PromoCodeForm
      pathToPromoCodesPage={pathToPromoCodesPage}
      addPromoCodeHandler={addPromoCodeHandler}
    />
  );
};

export default PromoCodeAdd;
