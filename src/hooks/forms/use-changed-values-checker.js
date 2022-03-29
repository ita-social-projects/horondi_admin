import { useEffect, useRef } from 'react';
import _ from 'lodash';
import { checkInitialValue } from '../../utils/check-initial-values';

export default function useChangedValuesChecker(values, errors) {
  const changed = useRef(false);
  const firstlyMounted = useRef(false);
  const initialValues = useRef(values);

  if (values.additionalPrice && typeof values.additionalPrice !== 'string') {
    values.additionalPrice = JSON.stringify(values.additionalPrice);
  }

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

  if (
    _.isEmpty(errors) &&
    firstlyMounted.current &&
    !checkInitialValue(initialValues.current, values)
  ) {
    return (changed.current = true);
  } 
    return (changed.current = false);
  
}
