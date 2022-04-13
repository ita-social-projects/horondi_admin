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
              _id: '123'
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
          token: 'token'
        }
      }
    },
    result: {
      data: {
        deletePromoCode: { _id: '123' }
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
          token: 'token'
        }
      }
    },
    result: {
      data: {
        deletePromoCode: { _id: '123' }
      }
    }
  }
];
