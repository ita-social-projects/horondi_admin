export const initialState = {
  Bottoms: {
    list: [
      {
        optionType: 'BOTTOM',
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
        features: {
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
          },
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
          }
        },
        images: {
          thumbnail: 'thumbnail_eewk311kwdxcgv1_низ-шкіра-чорна.png'
        },
        relativePrice: 25,
        available: false,
        absolutePrice: null
      }
    ],
    bottomLoading: false,
    bottom: null,
    filter: {
      name: ''
    }
  },
  Table: {
    dense: false,
    pagination: {
      currentPage: 0,
      rowsPerPage: 10,
      rowsPerPageOptions: {
        0: 10,
        1: 20,
        3: 30
      }
    },
    itemsCount: 1
  }
};

export const itemKey = 'bottom';
