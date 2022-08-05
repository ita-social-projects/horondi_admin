import { getPromoCodeById } from '../../../../promo-code/operations/promo-code.queries';

export const mockData = {
  status: 'CREATED',
  paymentMethod: 'CASH',
  isPaid: false,
  recipient: {
    firstName: 'Vova',
    lastName: 'Buy',
    email: 'asdak7@gmail.com',
    phoneNumber: '999999991'
  },
  itemsPriceWithDiscount: [212],
  itemsDiscount: [0],
  user_id: null,
  promoCodeId: '62e90b1ba946c943d880f64c',
  delivery: {
    sentBy: 'SELFPICKUP',
    courier: {},
    novaPost: {},
    ukrPost: {},
    worldWide: {}
  },
  userComment: '',
  items: [
    {
      options: {
        size: {
          _id: '60439516a7532c33dcb326d7',
          name: 'S',
          price: 106
        }
      },
      product: {
        _id: '605660d9158e2fdb53498490',
        name: [
          {
            lang: 'ua',
            value: 'Сумка шопер'
          },
          {
            lang: 'en',
            value: 'Bag shopper'
          }
        ],
        basePrice: 10
      },
      model: {
        category: {
          _id: '6043be253e06ad3edcdb7b2e',
          name: [{ value: 'Сумки' }, { value: 'Bags' }]
        },
        _id: '60ba9acbba1b8596281cea18'
      },
      quantity: 2
    }
  ]
};
export const mockSizes = [
  { price: 111, size: { _id: '604394cba7532c33dcb326d6', name: 'M' } },

  { price: 111, size: { _id: '60439516a7532c33dcb326d7', name: 'S' } },

  { price: 94, size: { _id: '62d47204326ecc0029808c48', name: 'XL' } }
];

export const getPromoCodeMock = [
  {
    request: {
      query: getPromoCodeById,
      variables: { id: '62e90b1ba946c943d880f64c' }
    },
    result: {
      data: {
        getPromoCodeById: {
          categories: ['accessories'],
          code: 'wallet',
          dateFrom: '2022-08-02T11:31:22.110Z',
          dateTo: '2022-08-09T11:31:22.112Z',
          discount: 40
        }
      }
    }
  }
];
