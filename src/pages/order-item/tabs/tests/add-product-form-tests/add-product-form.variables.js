import { getCertificateByParams } from '../../../../certificates/operations/certificate.queries';
import { getPromoCodeByCode } from '../../../../promo-code/operations/promo-code.queries';

export const mockProduct = [
  {
    _id: '605659bc158e2fdb5349844a',
    purchasedCount: 85,
    name: [
      {
        lang: 'ua',
        value: 'Роллтоп жовтий'
      },
      {
        lang: 'en',
        value: 'Rolltop yellow'
      }
    ],
    basePrice: 60,
    model: {
      name: [
        {
          value: 'Роллтоп'
        },
        {
          value: 'Rolltop'
        }
      ]
    },
    rate: 2,
    images: {},
    pattern: {},
    mainMaterial: {},
    category: {}
  }
];

export const mockSize = [
  {
    size: {
      _id: '604394cba7532c33dcb326d1',
      name: 'L'
    },
    price: 136
  },
  {
    size: {
      _id: '60439516a7532c33dcb326d1',
      name: 'S'
    },
    price: 136
  }
];

export const mockItems = [
  {
    options: {
      size: {
        _id: '60439516a7532c33dcb326d7',
        name: 'S',
        price: 171
      }
    },
    product: {
      _id: '60566452158e2fdb534984b6',
      name: [
        {
          lang: 'ua',
          value: 'Сірий гаманець'
        },
        {
          lang: 'en',
          value: 'Purse grey'
        }
      ],
      basePrice: 50
    },
    quantity: 2
  }
];
export const mocksQuery = [
  {
    request: {
      query: getPromoCodeByCode,
      variables: {
        code: 'wallet'
      }
    },
    result: {
      data: {
        getPromoCodeByCode: {
          categories: ['accessories'],
          code: 'wallet',
          discount: 40,
          __typename: 'PromoCode',
          _id: '62e90b1ba946c943d880f64c'
        }
      }
    }
  },
  {
    request: {
      query: getCertificateByParams,
      variables: {
        params: {
          name: 'HOR12345678'
        }
      }
    },
    result: {
      data: {
        getCertificateByParams: {
          name: 'HOR12345678',
          value: 17,
          _id: '62d6cab33cb3cc2908fc7d61',
          __typename: 'PaginatedCertificate'
        }
      }
    }
  }
];

export const inputOptions = {
  touched: {},
  errors: {}
};
