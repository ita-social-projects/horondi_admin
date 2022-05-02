import { getCategoriesList } from '../../operations/categories-list.queries';

export const getCategoriesMocks = [
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
