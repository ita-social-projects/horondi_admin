import { bulkGenerateCertificates } from '../operations/certificate.mutation.js';

const dateStart = new Date();
dateStart.setHours(0, 0, 0, 0);

const requestObj = {
  query: bulkGenerateCertificates,
  variables: {
    email: '',
    dateStart,
    newCertificates: [
      {
        value: 500,
        quantity: 1
      }
    ]
  }
};

export const mutationVars = [
  {
    request: requestObj,
    result: {
      data: {
        generateCertificates: {
          items: [
            {
              name: 'HOR123232',
              value: 1500,
              dateStart: '2023-02-04T17:28:59.947Z',
              dateEnd: '2024-02-04T17:28:59.947Z'
            },
            {
              name: 'HOR543216',
              value: 500,
              dateStart: '2023-02-04T17:28:59.947Z',
              dateEnd: '2024-02-04T17:28:59.947Z'
            }
          ]
        }
      }
    }
  }
];

export const mutationErr = [
  {
    request: requestObj,
    result: {
      error: new Error('Network error occurred')
    }
  }
];
