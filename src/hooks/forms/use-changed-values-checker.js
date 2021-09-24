import { useEffect, useRef } from 'react';
import _ from 'lodash';
import { checkInitialValue } from '../../utils/check-initial-values';

export default function useChangedValuesChecker(values, errors) {
  const changed = useRef(false);
  const firstlyMounted = useRef(false);
  const initialValues = useRef(values);

  useEffect(() => {
    if (values.additionalPrice && typeof values.additionalPrice !== 'string')
      values.additionalPrice = JSON.stringify(values.additionalPrice);

    if (
      _.isEmpty(errors) &&
      firstlyMounted.current &&
      !checkInitialValue(initialValues.current, values)
    )
      changed.current = true;
    else changed.current = false;
  }, [values, errors]);

  useEffect(() => {
    firstlyMounted.current = true;
    if (
      initialValues.current.additionalPrice &&
      typeof initialValues.current.additionalPrice !== 'string'
    )
      initialValues.current.additionalPrice = JSON.stringify(
        initialValues.current.additionalPrice
      );
  }, []);

  return changed.current;
}
