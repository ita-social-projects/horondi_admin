import { useState, useEffect } from 'react';
import _ from 'lodash';
import { checkInitialValue } from '../../utils/check-initial-values';

export default function useChangedValuesChecker(values, errors) {
  const [changed, toggleChanged] = useState(false);
  const [firstlyMounted, toggleFirstlyMounted] = useState(false);
  const [initialValues, changeInitialValues] = useState(values);

  useEffect(() => {
    if (
      initialValues.additionalPriceType &&
      values.additionalPrice !== initialValues.additionalPrice
    )
      changeInitialValues((initialState) => ({
        ...initialState,
        additionalPrice: JSON.stringify(initialState.additionalPrice)
      }));

    if (
      _.isEmpty(errors) &&
      firstlyMounted &&
      !checkInitialValue(initialValues, values)
    )
      toggleChanged(true);
    else toggleChanged(false);
  }, [values, errors]);
  useEffect(() => {
    toggleFirstlyMounted(true);
  }, []);

  return changed;
}
