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
  promoCodeId: '62b32ce6b059bc152cb88',
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
      quantity: 2
    }
  ]
};

export const getPromoCodeMock = [
  {
    request: {
      query: getPromoCodeById
    },
    result: {
      data: {
        getPromoCodeById: {
          code: 'aa',
          discount: 10,
          categories: ['accessories']
        }
      }
    }
  }
];
