import { promoCodeCertificates } from '../consts/promo-code-status';

export const statusPromoCodeFilterObject = promoCodeCertificates.map(
  ({ value, label }) => ({
    key: value,
    value: label
  })
);
