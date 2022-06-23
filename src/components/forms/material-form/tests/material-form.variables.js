const defaultProps = {
  id: '',
  match: {},
  values: {},
  errors: {},
  touched: {},
  material: {
    _id: '',
    name: [
      {
        value: ''
      },
      {
        value: ''
      }
    ],
    description: [
      {
        value: ''
      },
      {
        value: ''
      }
    ],
    available: false,
    purpose: '',
    absolutePrice: 0,
    relativePrice: null,
    colors: []
  }
};
const id = '6043c2d13e06ad3edcdb7b33';
const material = {
  _id: '6043c2d13e06ad3edcdb7b33',
  name: [
    {
      value: 'Защіпка'
    },
    {
      value: 'Backstop'
    }
  ],
  description: [
    {
      lang: 'ua',
      value: 'Защіпка - надійний спосіб закрити рюкзак'
    },
    {
      lang: 'en',
      value: 'A clasp is a safe way to close a backpack'
    }
  ],
  available: true,
  absolutePrice: 0,
  relativePrice: null,
  purpose: 'CLOSURE',
  colors: [
    {
      _id: '6043a9cc3e06ad3edcdb7b0e',
      name: [
        {
          lang: 'ua',
          value: 'Чорний'
        },
        {
          lang: 'en',
          value: 'Black'
        }
      ],
      simpleName: [
        {
          lang: 'ua',
          value: 'Чорний'
        },
        {
          lang: 'en',
          value: 'Black'
        }
      ],
      colorHex: '#000000'
    }
  ]
};

module.exports = {
  id,
  material,
  defaultProps
};
