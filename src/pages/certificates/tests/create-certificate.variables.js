import { bulkGenerateCertificates } from '../operations/certificate.mutation.js';

const dateStart = new Date();
dateStart.setHours(0, 0, 0, 0);

const requestObj = {
  query: bulkGenerateCertificates,
  variables: {
    email: '',
    newCertificates: [
      {
        value: 500,
        count: 1
      }
    ]
  }
};

export const mutationVars = [
  {
    request: requestObj,
    result: {
      data: {
        generateCertificate: {
          certificates: [
            {
              name: 'HOR12345678',
              value: 1500,
              dateStart: '2023-02-04T17:28:59.947Z',
              dateEnd: '2024-02-04T17:28:59.947Z'
            },
            {
              name: 'HOR87654321',
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
