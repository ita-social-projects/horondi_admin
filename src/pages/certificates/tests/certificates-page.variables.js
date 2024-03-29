import { getAllCertificates } from '../operations/certificate.queries';
import {
  deleteCertificateById,
  updateCertificateStatus
} from '../operations/certificate.mutation';

export const getCertificatesMock = [
  {
    request: {
      query: getAllCertificates,
      variables: {
        limit: 10,
        skip: 0,
        sortOrder: null,
        sortBy: null,
        search: '',
        status: []
      }
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
              isActivated: false,
              isExpired: true,
              isUsed: false,
              inProgress: false,
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
              inProgress: false,
              name: 'HOR58332589',
              value: 1000,
              _id: '624ee6653daf9e63c88ceb22'
            },
            {
              admin: [],
              dateEnd: '2023-04-08T12:59:25.818Z',
              dateStart: '2022-04-07T12:59:25.818Z',
              isActivated: false,
              isExpired: false,
              isUsed: true,
              inProgress: false,
              name: 'HOR67541841',
              value: 1500,
              _id: '624ee35a3daf9e63c88ceac0'
            },
            {
              admin: [],
              dateEnd: '2023-04-08T12:59:25.818Z',
              dateStart: '2022-04-07T12:59:25.818Z',
              isActivated: false,
              isExpired: false,
              isUsed: false,
              inProgress: true,
              name: 'HOR58332589',
              value: 1000,
              _id: '624ee6653daf9e63c88ceb21'
            }
          ],
          count: 4
        }
      }
    }
  },
  {
    request: {
      query: deleteCertificateById,
      variables: {
        id: '61e04efaedc3271854cf4f38'
      }
    },
    result: {
      data: {
        deleteCertificateById: {
          _id: '61e04efaedc3271854cf4f38'
        }
      }
    }
  },
  {
    request: {
      query: updateCertificateStatus,
      variables: {
        params: {
          name: 'HOR001'
        },
        statusUpdate: 'USED'
      }
    },
    result: {
      data: {
        deleteCertificateById: {
          name: 'HOR001'
        }
      }
    }
  }
];

export const noCertificatesMock = [
  {
    request: {
      query: getAllCertificates
    },
    result: {
      data: {
        getAllCertificates: {
          __typename: 'PaginatedCertificate',
          items: [],
          count: 0
        }
      }
    }
  }
];

export const mockStore = {
  rowsPerPage: 10,
  currentPage: 1
};
