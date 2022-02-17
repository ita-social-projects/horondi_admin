import { getAllCertificates } from '../operations/certificate.queries';

export const certificatesMock = [
  {
    request: {
      query: getAllCertificates
    },
    result: {
      data: {
        getAllCertificates: {
          __typename: 'PaginatedCertificate',
          items: [
            {
              _id: '61e04efaedc3271854cf4f38',
              name: 'HOR001',
              value: 1500,
              createdBy: {
                _id: '5fcfc2c5823c593d1c28c459'
              },
              isUsed: false,
              isActivated: true,
              dateStart: '2022-01-13T16:10:29.323Z',
              dateEnd: '2023-01-14T16:10:29.323Z'
            },
            {
              _id: '61e04efaedc3271854cf4f32',
              name: 'HOR002',
              value: 1500,
              createdBy: {
                _id: '5fbe46259e79126198841b3e'
              },
              isUsed: true,
              isActivated: false,
              dateStart: '2022-01-13T16:10:29.323Z',
              dateEnd: '2023-01-14T16:10:29.323Z'
            },
            {
              _id: '61e1591b7908b669fca1b651',
              name: 'HOR003',
              value: 500,
              createdBy: {
                _id: '5fafd90d5fa52e240c0d1d37'
              },
              isUsed: false,
              isActivated: false,
              dateStart: '2022-01-13T16:10:29.323Z',
              dateEnd: '2023-01-14T16:10:29.323Z'
            }
          ]
        }
      }
    }
  }
];

export const usersMock = {
  list: [
    {
      _id: '5fcfc2c5823c593d1c28c459',
      firstName: 'Ivan',
      lastName: 'Bonk'
    },
    {
      _id: '5fbe46259e79126198841b3e',
      firstName: 'Денис',
      lastName: 'Коропалов'
    },
    {
      _id: '5fafd90d5fa52e240c0d1d37',
      firstName: 'Dmytro',
      lastName: 'Didukh'
    }
  ],
  loading: false
};
