export const getLabelValue = (values, additionalPriceType) => {
  switch (values.additionalPriceType) {
    case 'ABSOLUTE_INDICATOR':
      return additionalPriceType.absolutePrice[0].value;
    case 'RELATIVE_INDICATOR':
      return additionalPriceType.relativePrice[0].value;
    default:
      return '';
  }
};

export const calculateAddittionalPriceValue = (values, exchangeRate) =>
  values.additionalPriceType === 'ABSOLUTE_INDICATOR'
    ? calculateConvertedValue(values, exchangeRate)
    : '0';

const calculateConvertedValue = (values, exchangeRate) => {
  const result = Number(values?.additionalPrice) * Number(exchangeRate);
  return result.toFixed(2);
};
