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
              admin: [{ firstName: 'Andrii', lastName: 'Fedyshyn' }],
              dateEnd: '2023-04-08T12:59:25.818Z',
              dateStart: '2022-04-07T12:59:25.818Z',
              isActivated: true,
              isExpired: false,
              isUsed: false,
              name: 'HOR67541841',
              value: 1500,
              _id: '624ee35a3daf9e63c88ceac3'
            },
            {
              admin: [{ firstName: 'Andrii', lastName: 'Fedyshyn' }],
              dateEnd: '2023-04-08T12:59:25.818Z',
              dateStart: '2022-04-07T12:59:25.818Z',
              isActivated: true,
              isExpired: false,
              isUsed: false,
              name: 'HOR58332589',
              value: 1000,
              _id: '624ee6653daf9e63c88ceb22'
            }
          ],
          count: 2
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
