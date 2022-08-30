export const partItemId = '619e937b5bbfb0002540b7b9';

export const materialsByPurpose = {
  bottom: [
    {
      _id: '6043ac5d3e06ad3edcdb7b13',
      name: [
        {
          lang: 'ua',
          value: 'Шкіра'
        },
        {
          lang: 'en',
          value: 'Leather'
        }
      ],
      colors: [
        {
          _id: '6043a9cc3e06ad3edcdb7b0e',
          name: [
            {
              value: 'Чорний'
            },
            {
              value: 'Black'
            }
          ]
        }
      ]
    }
  ]
};

export const partItem = {
  name: [
    {
      lang: 'ua',
      value: 'Шкіра чорна'
    },
    {
      lang: 'en',
      value: 'Black leather'
    }
  ],
  optionType: 'BOTTOM',
  features: {
    material: {
      _id: '6043ac5d3e06ad3edcdb7b13',
      name: [
        {
          lang: 'ua',
          value: 'Шкіра'
        },
        {
          lang: 'en',
          value: 'Leather'
        }
      ]
    },
    color: {
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
      ]
    }
  },
  images: {
    thumbnail: 'thumbnail_eewk311kwdxcgv1_низ-шкіра-чорна.png',
    medium: 'medium_eewk311kwdxcgv1_низ-шкіра-чорна.png',
    small: 'small_eewk311kwdxcgv1_низ-шкіра-чорна.png',
    large: 'large_eewk311kwdxcgv1_низ-шкіра-чорна.png'
  },
  absolutePrice: null,
  relativePrice: 25,
  available: true
};

export const addPartItemDispatch = {
  bottom: {
    name: [
      {
        lang: 'ua',
        value: 'Шкіра чорна'
      },
      {
        lang: 'en',
        value: 'Black leather'
      }
    ],
    available: false,
    optionType: 'BOTTOM',
    features: {
      material: '6043ac5d3e06ad3edcdb7b13',
      color: '6043a9cc3e06ad3edcdb7b0e'
    },
    absolutePrice: null,
    relativePrice: 25
  },
  id: '619e937b5bbfb0002540b7b9'
};
