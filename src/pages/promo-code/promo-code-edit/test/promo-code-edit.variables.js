import { getPromoCodeById } from '../../operations/promo-code.queries';

export const mocks = [
  {
    request: {
      query: getPromoCodeById,
      variables: { id: '61f3ca58fb37d558e8bba8de' }
    },
    result: {
      data: {
        getPromoCodeById: {
          _id: '61f3ca58fb37d558e8bba8de',
          code: 'testttttt',
          dateTo: '2022-03-04T10:49:49.736Z',
          dateFrom: '2022-02-09T10:49:49.725Z',
          discount: 15,
          categories: ['All']
        }
      }
    }
  }
];
