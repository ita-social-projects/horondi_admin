import _ from 'lodash';
import { useState, useEffect } from 'react';
import { checkInitialValue } from '../../utils/check-initial-values';

export default function useChangedValuesChecker(values, isEdit, errors) {
  const [changed, toggleChanged] = useState(false);
  const [firstlyMounted, toggleFirstlyMounted] = useState(false);
  const [initialValues] = useState(values);

  useEffect(() => {
    if (firstlyMounted && isEdit && !checkInitialValue(initialValues, values))
      toggleChanged(true);
    else toggleChanged(false);
  }, [values]);
  useEffect(() => {
    toggleFirstlyMounted(true);
  }, []);
  if (firstlyMounted && _.isEmpty(errors, true)) {
    toggleChanged(true);
  }
  return changed;
}
