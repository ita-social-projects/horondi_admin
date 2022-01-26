import React from 'react';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
// import { useMutation, useQuery } from '@apollo/client';

import { config } from '../../../configs';
import { promoValidationSchema } from '../../../validations/promo-code/promo-code-validation';

import PromoCodeForm from '../promo-code-form/promo-code-form';

function PromoCodeEdit() {
  const { id } = useParams();
  const history = useHistory();

  const pathToPromoCodesPage = config.routes.pathToPromoCodes;

  const initialState = {
    code: '',
    dateTo: '',
    dateFrom: '',
    discount: ''
  };

  const goToPromoPage = () => {
    history.push(pathToPromoCodesPage);
  };

  return (
    <>
      <PromoCodeForm
        goToPromoPage={goToPromoPage}
        pathToPromoCodesPage={pathToPromoCodesPage}
        initialState={initialState}
        promoValidationSchema={promoValidationSchema}
      />
    </>
  );
}

export default PromoCodeEdit;
