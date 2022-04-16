import { createStore, combineReducers } from 'redux';

const material = {
  list: [],
  filters: {
    available: [],
    colors: [],
    name: '',
    purpose: []
  }
};

const model = {
  modelLoading: false,
  model: {
    _id: '6043bf9e3e06ad3edcdb7b30',
    name: [
      {
        lang: 'ua',
        value: 'Роллтоп'
      },
      {
        lang: 'en',
        value: 'Rolltop'
      }
    ],
    category: {
      _id: '6043bdeb3e06ad3edcdb7b2d',
      name: [
        {
          value: 'Рюкзаки ',
          lang: 'ua'
        },
        {
          value: 'Backpacks',
          lang: 'en'
        }
      ]
    },
    sizes: [
      {
        _id: '604394a2a7532c33dcb326d5',
        name: 'M',
        modelId: {
          name: [
            {
              value: 'Роллтоп',
              lang: 'ua'
            },
            {
              value: 'Rolltop',
              lang: 'en'
            }
          ]
        },
        available: true
      },
      {
        _id: '60439516a7532c33dcb326d7',
        name: 'S',
        modelId: {
          name: [
            {
              value: 'Роллтоп',
              lang: 'ua'
            },
            {
              value: 'Rolltop',
              lang: 'en'
            }
          ]
        },
        available: true
      }
    ],
    images: {
      large: 'large_id73cf0kly0of2u_rolltop.png',
      medium: 'medium_id73cf0kly0of2u_rolltop.png',
      small: 'small_id73cf0kly0of2u_rolltop.png',
      thumbnail: 'thumbnail_id73cf0kly0of2u_rolltop.png'
    },
    priority: 2,
    show: false,
    availableForConstructor: true,
    description: [
      {
        value:
          '<p>Крутий рюкзак який класно підійде для прогулянки містом та подорожей</p>',
        lang: 'ua'
      },
      {
        value:
          '<p>A cool backpack that is great for walking around the city and traveling</p>',
        lang: 'en'
      }
    ],
    eligibleOptions: {
      constructorBasic: [
        {
          _id: '604e329bb17ecf65048afd6c',
          available: true,
          customizable: true,
          image: 'small_id73jyckmc4ycke_основа-тканина-жовта.png',
          basePrice: [
            {
              value: 0,
              currency: 'UAH'
            },
            {
              value: 0,
              currency: 'USD'
            }
          ],
          name: [
            {
              value: 'Мальмо Жовта',
              lang: 'ua'
            },
            {
              value: 'Malmo Yellow',
              lang: 'en'
            }
          ],
          features: {
            material: {
              _id: '6043a1f33e06ad3edcdb7b09',
              name: [
                {
                  value: 'Мальмо',
                  lang: 'ua'
                },
                {
                  value: 'Malmo',
                  lang: 'en'
                }
              ]
            },
            color: {
              _id: '6043a99c3e06ad3edcdb7b0c',
              colorHex: '#e9ff00',
              name: [
                {
                  value: 'Жовтий',
                  lang: 'ua'
                },
                {
                  value: 'Yellow',
                  lang: 'en'
                }
              ]
            }
          }
        },
        {
          _id: '604e32fdb17ecf65048afd6d',
          available: true,
          customizable: true,
          image: 'small_id73jyckm9cg56a_основа-тканина-синя.png',
          basePrice: [
            {
              value: 58864.34,
              currency: 'UAH'
            },
            {
              value: 2000,
              currency: 'USD'
            }
          ],
          name: [
            {
              value: 'Мальмо Синя',
              lang: 'ua'
            },
            {
              value: 'Malmo Blue',
              lang: 'en'
            }
          ],
          features: {
            material: {
              _id: '6043a1f33e06ad3edcdb7b09',
              name: [
                {
                  value: 'Мальмо',
                  lang: 'ua'
                },
                {
                  value: 'Malmo',
                  lang: 'en'
                }
              ]
            },
            color: {
              _id: '6043a9bb3e06ad3edcdb7b0d',
              colorHex: '#002cff',
              name: [
                {
                  value: 'Синій',
                  lang: 'ua'
                },
                {
                  value: 'Blue',
                  lang: 'en'
                }
              ]
            }
          }
        },
        {
          _id: '604e3319b17ecf65048afd6e',
          available: false,
          customizable: true,
          image: 'small_id73jyckm9cgqf1_основа-тканина-червона.png',
          basePrice: [
            {
              value: 44148.26,
              currency: 'UAH'
            },
            {
              value: 1500,
              currency: 'USD'
            }
          ],
          name: [
            {
              value: 'Мальмо Червона',
              lang: 'ua'
            },
            {
              value: 'Malmo Red',
              lang: 'en'
            }
          ],
          features: {
            material: {
              _id: '6043a1f33e06ad3edcdb7b09',
              name: [
                {
                  value: 'Мальмо',
                  lang: 'ua'
                },
                {
                  value: 'Malmo',
                  lang: 'en'
                }
              ]
            },
            color: {
              _id: '6043a1653e06ad3edcdb7b08',
              colorHex: '#ff0000',
              name: [
                {
                  value: 'Червоний',
                  lang: 'ua'
                },
                {
                  value: 'Red',
                  lang: 'en'
                }
              ]
            }
          }
        }
      ],
      constructorPattern: [
        {
          _id: '619e24c25bbfb00025409bf3',
          name: [
            {
              value: 'Червоний',
              lang: 'ua'
            },
            {
              value: 'Red',
              lang: 'en'
            }
          ],
          images: {
            large: 'large_eewk311kwdggeyx_158.jpg',
            medium: 'medium_eewk311kwdggeyx_158.jpg',
            small: 'small_eewk311kwdggeyx_158.jpg',
            thumbnail: 'thumbnail_eewk311kwdggeyx_158.jpg'
          },
          features: {
            material: {
              _id: '6043b2ec3e06ad3edcdb7b17',
              name: [
                {
                  value: 'Нитки для шиття',
                  lang: 'ua'
                },
                {
                  value: 'Threads for sewing',
                  lang: 'en'
                }
              ]
            },
            handmade: false
          }
        }
      ],
      constructorFrontPocket: [
        {
          _id: '604e3341b17ecf65048afd6f',
          available: true,
          customizable: null,
          image: 'small_id73jyckm9chlo6_язичок-тканина-чорний.png',
          basePrice: [
            {
              value: 14716.09,
              currency: 'UAH'
            },
            {
              value: 500,
              currency: 'USD'
            }
          ],
          name: [
            {
              value: 'Кишенька чорна',
              lang: 'ua'
            },
            {
              value: 'Pocket Black',
              lang: 'en'
            }
          ],
          features: {
            material: {
              _id: '6043ab033e06ad3edcdb7b12',
              name: [
                {
                  value: 'Кордура',
                  lang: 'ua'
                },
                {
                  value: 'Сordura',
                  lang: 'en'
                }
              ]
            },
            color: {
              _id: '6043a9cc3e06ad3edcdb7b0e',
              colorHex: '#000000',
              name: [
                {
                  value: 'Чорний',
                  lang: 'ua'
                },
                {
                  value: 'Black',
                  lang: 'en'
                }
              ]
            }
          }
        }
      ],
      constructorBottom: [
        {
          _id: '604e3385b17ecf65048afd71',
          available: true,
          customizable: true,
          image: 'small_id73jyckm9cj1uy_низ-шкіра-коричнева.png',
          basePrice: [
            {
              value: 35318.6,
              currency: 'UAH'
            },
            {
              value: 1200,
              currency: 'USD'
            }
          ],
          name: [
            {
              value: 'Шкіра Коричнева',
              lang: 'ua'
            },
            {
              value: 'Leather Brown',
              lang: 'en'
            }
          ],
          features: {
            material: {
              _id: '6043ac5d3e06ad3edcdb7b13',
              name: [
                {
                  value: 'Шкіра',
                  lang: 'ua'
                },
                {
                  value: 'Leather',
                  lang: 'en'
                }
              ]
            },
            color: {
              _id: '6043aa9c3e06ad3edcdb7b10',
              colorHex: '#500000',
              name: [
                {
                  value: 'Коричневий',
                  lang: 'ua'
                },
                {
                  value: 'Brown',
                  lang: 'en'
                }
              ]
            }
          }
        },
        {
          _id: '604e33a0b17ecf65048afd72',
          available: true,
          customizable: true,
          image: 'small_id73jyckm9cjn1a_низ-шкіра-чорна.png',
          basePrice: [
            {
              value: 35318.6,
              currency: 'UAH'
            },
            {
              value: 1200,
              currency: 'USD'
            }
          ],
          name: [
            {
              value: 'Шкіра Чорна',
              lang: 'ua'
            },
            {
              value: 'Leather Black',
              lang: 'en'
            }
          ],
          features: {
            material: {
              _id: '6043ac5d3e06ad3edcdb7b13',
              name: [
                {
                  value: 'Шкіра',
                  lang: 'ua'
                },
                {
                  value: 'Leather',
                  lang: 'en'
                }
              ]
            },
            color: {
              _id: '6043a9cc3e06ad3edcdb7b0e',
              colorHex: '#000000',
              name: [
                {
                  value: 'Чорний',
                  lang: 'ua'
                },
                {
                  value: 'Black',
                  lang: 'en'
                }
              ]
            }
          }
        },
        {
          _id: '604e33bcb17ecf65048afd73',
          available: true,
          customizable: true,
          image: 'small_id73jyckm9ck87s_низ-шкірозамінник-чорний.png',
          basePrice: [
            {
              value: 29432.17,
              currency: 'UAH'
            },
            {
              value: 1000,
              currency: 'USD'
            }
          ],
          name: [
            {
              value: 'Шкірозамінник Чорний',
              lang: 'ua'
            },
            {
              value: 'Leatherette Black',
              lang: 'en'
            }
          ],
          features: {
            material: {
              _id: '6043aaab3e06ad3edcdb7b11',
              name: [
                {
                  value: 'Шкірзамінник',
                  lang: 'ua'
                },
                {
                  value: 'Leatherette',
                  lang: 'en'
                }
              ]
            },
            color: {
              _id: '6043a9cc3e06ad3edcdb7b0e',
              colorHex: '#000000',
              name: [
                {
                  value: 'Чорний',
                  lang: 'ua'
                },
                {
                  value: 'Black',
                  lang: 'en'
                }
              ]
            }
          }
        }
      ]
    }
  }
};

const pattern = {
  list: []
};

const constructor = {
  constructorTabs: 0,
  constructorElementMethod: {},
  editableConstructorElement: {}
};

const table = {
  dense: ''
};

export const store = createStore(
  combineReducers({
    Material: (state = [], action) => material,
    Model: (state = [], action) => model,
    Pattern: (state = [], action) => pattern,
    Constructor: (state = [], action) => constructor,
    Table: (state = [], action) => table
  })
);

export const match = {
  path: '/constructor/:id',
  url: '/constructor/6043bf9e3e06ad3edcdb7b30',
  isExact: true,
  params: {
    id: '6043bf9e3e06ad3edcdb7b30'
  }
};
