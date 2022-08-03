const mockSize = [
  {
    size: {
      _id: '60439516a7532c33dcb326d7',
      name: 'S'
    },
    price: 106
  },
  {
    size: {
      _id: '604787abfc3c0b3b34fd485a',
      name: 'L'
    },
    price: 116
  }
];

const mockItems = [
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
const mockItemsPriceWithDiscount = [123];

module.exports = {
  mockSize,
  mockItems,
  mockItemsPriceWithDiscount
};
