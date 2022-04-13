import { getAllPromoCodes } from '../operations/promo-code.queries';
import { deletePromoCodeByID } from '../operations/promo-code.mutation';

const rowsPerPage = 10;
const currentPage = 1;

export const mocks = [
  {
    request: {
      query: getAllPromoCodes,
      variables: {
        limit: rowsPerPage,
        skip: rowsPerPage * currentPage
      }
    },
    result: {
      data: {
        getAllPromoCodes: {
          count: '1',
          items: [
            {
              categories: ['backpacks', 'bags', 'accessories', 'constructor'],
              code: 'www',
              dateFrom: '2022-04-08T14:22:43.437Z',
              dateTo: '2022-04-30T14:22:43.452Z',
              discount: 10,
              _id: '62470ac47cc7af17305abd47'
            }
          ]
        }
      },
      loading: false
    }
  },
  {
    request: {
      query: deletePromoCodeByID,
      variables: {
        id: 'promoID'
      },
      context: {
        headers: {
          token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MjJmNDhjZWEwZDEyYTAwMjRkNzgyN2EiLCJpYXQiOjE2NDk0MjkyNzAsImV4cCI6MTY0OTQzMjg3MH0.WcDQSLKvEpOCIKe_4D6DrCgNhUd0c4Hgyyo75hfEhnI'
        }
      }
    },
    result: {
      data: {
        deletePromoCode: { _id: '6239a310ed27613a04a17bb8' }
      }
    }
  }
];
export const mocksWithoutPromocodes = [
  {
    request: {
      query: getAllPromoCodes,
      variables: {
        limit: rowsPerPage,
        skip: rowsPerPage * currentPage
      }
    },
    result: {
      data: {
        getAllPromoCodes: {
          count: '0',
          items: []
        }
      },
      loading: false
    }
  },
  {
    request: {
      query: deletePromoCodeByID,
      variables: {
        id: 'promoID'
      },
      context: {
        headers: {
          token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MjJmNDhjZWEwZDEyYTAwMjRkNzgyN2EiLCJpYXQiOjE2NDk0MjkyNzAsImV4cCI6MTY0OTQzMjg3MH0.WcDQSLKvEpOCIKe_4D6DrCgNhUd0c4Hgyyo75hfEhnI'
        }
      }
    },
    result: {
      data: {
        deletePromoCode: { _id: '6239a310ed27613a04a17bb8' }
      }
    }
  }
];
