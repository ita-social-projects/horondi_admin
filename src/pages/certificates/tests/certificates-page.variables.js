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
              createdBy: null,
              dateEnd: '2023-02-17T20:47:20.706Z',
              dateStart: '2022-02-16T20:47:20.706Z',
              isActivated: true,
              isExpired: false,
              isUsed: false,
              name: 'HOR75444697',
              value: 500,
              _id: '620d71493d2dd60025f36aee'
            },
            {
              dateEnd: '2023-02-18T08:09:41.156Z',
              dateStart: '2022-02-17T08:09:41.156Z',
              isActivated: true,
              isExpired: false,
              isUsed: false,
              name: 'HOR72697525',
              value: 1000,
              _id: '620e0d3a874ff72fb8b48f6d',
              createdBy: {
                firstName: 'Anastasiia',
                lastName: 'Afanasieva',
                _id: '61c0afbf6ae9330025bf5e4a'
              }
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
