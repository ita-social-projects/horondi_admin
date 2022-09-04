export const initialState = {
  Material: {
    materialLoading: false,
    materialsByPurpose: {
      bottom: [
        {
          _id: '6043aaab3e06ad3edcdb7b11',
          name: [
            {
              lang: 'ua',
              value: 'Шкірзамінник'
            },
            {
              lang: 'en',
              value: 'Leatherette'
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
            },
            {
              _id: '6043aa9c3e06ad3edcdb7b10',
              name: [
                {
                  value: 'Коричневий'
                },
                {
                  value: 'Brown'
                }
              ]
            },
            {
              _id: '608a94823d21be0964c81193',
              name: [
                {
                  value: 'Рожевий'
                },
                {
                  value: 'Pink'
                }
              ]
            }
          ]
        }
      ]
    }
  },
  Bottom: {
    list: [],
    bottomLoading: false,
    bottom: {
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
        thumbnail: 'thumbnail_eewk311kwdxcgv1_низ-шкіра-чорна.png',
        medium: 'medium_eewk311kwdxcgv1_низ-шкіра-чорна.png',
        small: 'small_eewk311kwdxcgv1_низ-шкіра-чорна.png',
        large: 'large_eewk311kwdxcgv1_низ-шкіра-чорна.png'
      },
      relativePrice: 25,
      available: false,
      absolutePrice: null
    }
  },
  Currencies: {
    exchangeRate: 1
  }
};
