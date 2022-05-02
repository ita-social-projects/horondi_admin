import { statusCertificates } from '../consts/certificate-status';

export const statusCertificateFilterObject = statusCertificates.map(
  ({ value, label }) => ({
    key: value,
    value: label
  })
);
