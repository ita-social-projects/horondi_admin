import { getCategoriesList } from '../../operations/categories-list.queries';
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
          code: 'test',
          dateTo: '2022-03-04T10:49:49.736Z',
          dateFrom: '2022-02-09T10:49:49.725Z',
          discount: 15,
          categories: ['All']
        }
      }
    }
  },
  {
    request: {
      query: getCategoriesList
    },
    result: {
      data: {
        getAllCategories: {
          items: [
            {
              code: 'backpacks',
              name: [
                {
                  value: 'Рюкзаки '
                },
                {
                  value: 'Backpacks'
                }
              ]
            },
            {
              code: 'bags',
              name: [
                {
                  value: 'Сумки '
                },
                {
                  value: 'Bags'
                }
              ]
            },
            {
              code: 'accessories',
              name: [
                {
                  value: 'Аксесуари'
                },
                {
                  value: 'Accessories'
                }
              ]
            }
          ]
        }
      }
    }
  }
];
