export const getLabelValue = (values, additionalPriceType) => {
  switch (values.additionalPriceType) {
    case 'ABSOLUTE':
      return additionalPriceType.absolutePrice[0].value;
    case 'RELATIVE':
      return additionalPriceType.relativePrice[0].value;
    default:
      return '';
  }
};

export const calculateAddittionalPriceValue = (values, exchangeRate) =>
  values.additionalPriceType === 'ABSOLUTE'
    ? calculateConvertedValue(values, exchangeRate)
    : '0';

const calculateConvertedValue = (values, exchangeRate) => {
  if (values.additionalPrice < 0 || !Number(values.additionalPrice)) {
    return '0.00';
  }

  const result = Number(values?.additionalPrice) * Number(exchangeRate);
  return result.toFixed(2);
};
