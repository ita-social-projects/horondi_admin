import { useState, useEffect, useRef } from 'react';
import _ from 'lodash';
import { checkInitialValue } from '../../utils/check-initial-values';

export default function useChangedValuesChecker(values, errors) {
  const [changed, toggleChanged] = useState(false);
  const [firstlyMounted, toggleFirstlyMounted] = useState(false);
  const initialValues = useRef(values);

  useEffect(() => {
    if (values.additionalPrice && typeof values.additionalPrice !== 'string')
      values.additionalPrice = JSON.stringify(values.additionalPrice);

    if (
      _.isEmpty(errors) &&
      firstlyMounted &&
      !checkInitialValue(initialValues.current, values)
    )
      toggleChanged(true);
    else toggleChanged(false);
  }, [values, errors]);

  useEffect(() => {
    toggleFirstlyMounted(true);

    if (
      initialValues.current.additionalPrice &&
      typeof initialValues.current.additionalPrice !== 'string'
    )
      initialValues.current.additionalPrice = JSON.stringify(
        initialValues.current.additionalPrice
      );
  }, []);

  return changed;
}
