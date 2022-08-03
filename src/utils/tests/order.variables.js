import config from '../../configs/orders';

const { deliveryTypes } = config;

export const worldWideMock = {
  messenger: 'Telegram',
  messengerPhone: '0987654321',
  worldWideCountry: 'Ukraine',
  stateOrProvince: 'Lviv',
  worldWideCity: 'Lviv',
  worldWideStreet: 'dovbusha',
  cityCode: '68789'
};

export const novaPostMock = {
  city: 'Lviv',
  courierOffice: 'office 42'
};

export const ukrPostMock = {
  region: '',
  regionId: '',
  district: '',
  districtId: '',
  city: '',
  cityId: '',
  courierOffice: ''
};

export const courierMock = {
  region: '',
  district: '',
  city: '',
  street: '',
  house: '',
  flat: ''
};

export const selectedOrderMock = {
  items: [
    {
      options: { size: { _id: 'id', name: 'name' } },
      fixedPrice: 50,
      product: { _id: '_id', name: 'name', basePrice: 50 },
      quantity: 100
    }
  ]
};

export const deliveryMock = {
  sentBy: deliveryTypes.novaPost,
  courier: courierMock,
  novaPost: novaPostMock,
  ukrPost: ukrPostMock,
  worldWide: worldWideMock
};

export const setFormMock = {
  delivery: deliveryMock,
  status: 'test',
  paymentMethod: 'CARD',
  isPaid: 'isPaid',
  recipient: 'recipient',
  user_id: 'user_id',
  userComment: 'comment',
  items: selectedOrderMock.items
};

export const selectedProductMock = {
  _id: '60566452158e2fdb534984b6',
  purchasedCount: 157,
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
  basePrice: 50,
  model: {
    name: [
      {
        value: 'Гаманець шкіряний з гобеленом'
      },
      {
        value: 'Wallet'
      }
    ]
  },
  rate: 5,
  category: {
    name: [
      {
        value: 'Аксесуари'
      },
      {
        value: 'Accessories'
      }
    ]
  }
};

export const promoCodeMock = {
  getPromoCodeById: {
    discount: 10,
    categories: ['accessories']
  }
};

export const categoryMock = {
  name: [
    {
      lang: 'ua',
      value: 'Аксесуари'
    },
    {
      lang: 'en',
      value: 'Accessories'
    }
  ]
};

export const sizeMock = {
  id: '60439516a7532c33dcb326d7',
  name: 'S',
  price: 171
};

export const orderItemsMock = [
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
    quantity: 3
  }
];

export const orderWithExistedItemsMock = [
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
    quantity: 3
  },
  {
    options: {
      size: {
        _id: '60439516a7532c33dcb326d7',
        name: 'S',
        price: 171
      }
    },
    product: {
      basePrice: 50,
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
      _id: '60566452158e2fdb534984b6'
    },
    model: {
      category: {
        name: [
          {
            lang: 'ua',
            value: 'Аксесуари'
          },
          {
            lang: 'en',
            value: 'Accessories'
          }
        ]
      }
    },
    quantity: 3
  }
];

export const itemMerge = [
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
    quantity: 3
  },
  {
    options: {
      size: {
        _id: '60439516a7532c33dcb326d7',
        name: 'S',
        price: 171
      }
    },
    product: {
      basePrice: 50,
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
      _id: '60566452158e2fdb534984b6'
    },
    model: {
      category: {
        name: [
          {
            lang: 'ua',
            value: 'Аксесуари'
          },
          {
            lang: 'en',
            value: 'Accessories'
          }
        ]
      }
    },
    quantity: 6
  }
];

export const productsMock = [
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
    quantity: 3
  },
  {
    options: {
      size: {
        _id: '60439516a7532c33dcb326d7',
        name: 'S',
        price: 171
      }
    },
    product: {
      basePrice: 50,
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
      _id: '60566452158e2fdb534984b6'
    },
    model: {
      category: {
        name: [
          {
            lang: 'ua',
            value: 'Аксесуари'
          },
          {
            lang: 'en',
            value: 'Accessories'
          }
        ]
      }
    },
    quantity: 3
  }
];
export const mockItemsDiscount = [0];
export const mockItemsPriceWithDiscount = [123];
export const modelMock = {
  category: {
    name: [
      {
        lang: 'ua',
        value: 'Аксесуари'
      },
      {
        lang: 'en',
        value: 'Accessories'
      }
    ]
  }
};
