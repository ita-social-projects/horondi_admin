import getPromoCodeById from '../../operations/promo-code.queries';

export const mocks = [
  {
    request: {
      query: getPromoCodeById
    },
    result: {
      data: {
        getPromoCodeById: {
          _id: '61f3ca58fb37d558e8bba8de',
          code: 'testttttt',
          dateTo: '2022-01-29T10:49:49.736Z',
          dateFrom: '2022-01-28T10:49:49.725Z'
        }
      },
      loading: false
    }
  }
];
