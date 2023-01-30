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
            }
          ]
        }
      ],
      back: [
        {
          _id: '60f1b9c23544900024fe95e1',
          name: [
            {
              lang: 'ua',
              value: 'мальмо (200-215)'
            },
            {
              lang: 'en',
              value: 'malmo'
            }
          ],
          colors: [
            {
              _id: '6043a1653e06ad3edcdb7b08',
              name: [
                {
                  value: 'Червоний'
                },
                {
                  value: 'Red'
                }
              ]
            }
          ]
        }
      ],
      basic: [
        {
          _id: '6043a1f33e06ad3edcdb7b09',
          name: [
            {
              lang: 'ua',
              value: 'Мальмо'
            },
            {
              lang: 'en',
              value: 'Malmo'
            }
          ],
          colors: [
            {
              _id: '6043a1653e06ad3edcdb7b08',
              name: [
                {
                  value: 'Червоний'
                },
                {
                  value: 'Red'
                }
              ]
            }
          ]
        }
      ],
      strap: [
        {
          _id: '62e7e9fa8c59a030f06aa910',
          name: [
            {
              lang: 'ua',
              value: 'Матеріал для ремінця'
            },
            {
              lang: 'en',
              value: 'material name '
            }
          ],
          colors: [
            {
              _id: '6043a1653e06ad3edcdb7b08',
              name: [
                {
                  value: 'Червоний'
                },
                {
                  value: 'Red'
                }
              ]
            }
          ]
        }
      ]
    }
  },
  Bottoms: {
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
        thumbnail: 'thumbnail_eewk311kwdxcgv1_низ-шкіра-чорна.png'
      },
      relativePrice: 25,
      available: false,
      absolutePrice: null
    }
  },
  Currencies: {
    exchangeRate: 1
  },
  Backs: {
    list: [
      {
        _id: '60e71ce82d34d70024decb74',
        name: [
          {
            value: 'Чорна'
          },
          {
            value: 'black'
          }
        ],
        features: {
          material: {
            _id: '60f1ba003544900024fe95e3',
            name: [
              {
                lang: 'ua',
                value: 'сітка'
              },
              {
                lang: 'en',
                value: 'black grid'
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
        available: true,
        absolutePrice: 10,
        relativePrice: null,
        optionType: 'BACK',
        images: {
          thumbnail: 'thumbnail_4051mu10kqv2xdlz_91.png'
        }
      }
    ],
    backLoading: false,
    back: {
      _id: '60e71ce82d34d70024decb74',
      features: {
        material: {
          _id: '60f1ba003544900024fe95e3',
          name: [
            {
              lang: 'ua',
              value: 'сітка'
            },
            {
              lang: 'en',
              value: 'black grid'
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
      name: [
        {
          value: 'Чорна'
        },
        {
          value: 'black'
        }
      ],
      absolutePrice: 10,
      available: true,
      optionType: 'BACK',
      relativePrice: null,
      images: {
        thumbnail: 'thumbnail_4051mu10kqv2xdlz_91.png'
      }
    }
  },
  Basics: {
    basicsLoading: false,
    list: [],
    basic: {
      _id: '619eb96c5bbfb0002540bf84',
      name: [
        {
          lang: 'ua',
          value: 'Мальмо жовтий роллтоп'
        },
        {
          lang: 'en',
          value: 'Malmo yellow rolltop'
        }
      ],
      images: {
        thumbnail: 'thumbnail_eewk311kwe34min_основа-тканина-жовта.png'
      },
      absolutePrice: 15,
      relativePrice: null,
      available: true,
      optionType: 'BASIC',
      features: {
        material: {
          _id: '6043a1f33e06ad3edcdb7b09',
          name: [
            {
              lang: 'ua',
              value: 'Мальмо'
            },
            {
              lang: 'en',
              value: 'Malmo'
            }
          ]
        },
        color: {
          _id: '61f7d1d162a4f90025f58fc6',
          name: [
            {
              lang: 'ua',
              value: 'Жовтий'
            },
            {
              lang: 'en',
              value: 'Yellow'
            }
          ]
        }
      }
    }
  },
  Closures: {
    closuresLoading: false,
    list: [],
    closure: {
      name: [
        {
          lang: 'ua',
          value: 'Защіпки'
        },
        {
          lang: 'en',
          value: 'Backstop'
        }
      ],
      _id: '6043c8acc60c2e4b940189ae',
      available: true,
      images: {
        thumbnail: 'thumbnail_byy9rkksa3ukbh_144.jpg'
      },
      optionType: 'CLOSURE',
      absolutePrice: 6,
      relativePrice: null
    }
  },
  Pockets: {
    pocketsLoading: false,
    list: [],
    pocket: {
      _id: '60e5aa55190df500240e1656',
      name: [
        {
          lang: 'ua',
          value: 'Бокова кишеня'
        },
        {
          lang: 'en',
          value: 'Side pocket'
        }
      ],
      optionType: 'POCKET',
      images: {
        thumbnail: 'thumbnail_4051mu10kqtiqimp_201 (1).jpg'
      },
      positions: [
        {
          _id: '6100724bcbe2440024d73045',
          name: [
            {
              lang: 'ua',
              value: 'Ліворуч'
            },
            {
              lang: 'en',
              value: 'Left'
            }
          ]
        }
      ],
      available: true,
      absolutePrice: null
    }
  },
  Positions: {
    positionsLoading: false,
    position: {
      available: true,
      name: [
        {
          lang: 'ua',
          value: 'Ліворуч'
        },
        {
          lang: 'en',
          value: 'Left'
        }
      ],
      _id: '6100724bcbe2440024d73045',
      optionType: 'POSITION'
    },
    list: {
      items: [
        {
          _id: '6100724bcbe2440024d73045',
          name: [
            {
              lang: 'ua',
              value: 'Ліворуч'
            },
            {
              lang: 'en',
              value: 'Left'
            }
          ],
          available: true,
          optionType: 'POSITION'
        }
      ]
    }
  },
  Straps: {
    strapsLoading: false,
    list: [],
    strap: {
      _id: '62a8345a64edab3b28f2d20e',
      name: [
        {
          lang: 'ua',
          value: 'Чорний ремінець'
        },
        {
          lang: 'en',
          value: 'Black strap'
        }
      ],
      optionType: 'STRAP',
      features: {
        material: {
          _id: '62e7e9fa8c59a030f06aa910',
          name: [
            {
              lang: 'ua',
              value: 'Матеріал для ремінця'
            },
            {
              lang: 'en',
              value: 'material name '
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
        thumbnail: 'thumbnail_497bool4dtr86i_44561199.jpg'
      },
      available: true,
      absolutePrice: null,
      relativePrice: 5
    }
  }
};
