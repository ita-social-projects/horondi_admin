export const pattern = {
  _id: 'de57efa1b187d1913414b430',
  description: [
    {
      value: 'Фабричний гобелен із зображенням квітів'
    },
    {
      value: 'Manufactured tapestry with flower pattern'
    }
  ],
  name: [
    {
      value: 'Квіти'
    },
    {
      value: 'Flowers'
    }
  ],
  handmade: false,
  available: true,
  material: 'Cotton',
  images: {
    thumbnail: 'thumbnail_335nr4j5dkebkvus7_flowers.jpg'
  }
};
export const patternId = '0c3c7929dd85de268bed4fe8';
export const patternToRemoveId = '0c3c7929dd85de268bed4fe8';
export const patterns = [
  {
    _id: '0c3c7929dd85de268bed4fe8',
    description: [
      {
        value: 'Фабричний гобелен із зображенням рожевої хвильки'
      },
      {
        value: 'Manufactured tapestry with pink wave pattern'
      }
    ],
    name: [
      {
        value: 'Рожева хвилька'
      },
      {
        value: 'Pink wave'
      }
    ],
    handmade: false,
    available: true,
    material: 'Cotton',
    images: {
      thumbnail: 'thumbnail_335nr4j5dkebkw5cy_pink-wave.jpg'
    }
  },
  {
    _id: 'fdc7529135f2c050c877a67a',
    description: [
      {
        value: 'Фабричний гобелен із зображенням синьої хвильки'
      },
      {
        value: 'Manufactured tapestry with blue wave pattern'
      }
    ],
    name: [
      {
        value: 'Синя хвилька'
      },
      {
        value: 'Blue wave'
      }
    ],
    handmade: false,
    available: true,
    material: 'Cotton',
    images: {
      thumbnail: 'thumbnail_335nr4j5dkebkvle7_blue-wave.jpg'
    }
  },
  {
    _id: '51af3801f347948f14f6933c',
    description: [
      {
        value: 'Фабричний гобелен із зображенням синьо-рожевої хвильки'
      },
      {
        value: 'Manufactured tapestry with blue-pink wave pattern'
      }
    ],
    name: [
      {
        value: 'Синьо-рожева хвилька'
      },
      {
        value: 'Blue-pink wave'
      }
    ],
    handmade: false,
    available: true,
    material: 'Cotton',
    images: {
      thumbnail: 'thumbnail_335nr431gkebp19ht_blue-pink.jpg'
    }
  }
];

export const patternToUpdate = {
  id: '0c3c7929dd85de268bed4fe8',
  pattern: {
    name: [
      {
        lang: 'uk',
        value: 'Червона хвилька'
      },
      {
        lang: 'en',
        value: 'Red wave'
      }
    ]
  }
};
export const fakePattern = {
  data: {
    getPatternById: {
      _id: '0c3c7929dd85de268bed4fe8',
      name: [
        {
          lang: 'uk',
          value: 'Олені'
        },
        {
          lang: 'en',
          value: 'Deers'
        }
      ],
      images: {
        large: 'large-deers.jpg',
        medium: 'medium-deers.jpg',
        small: 'small-deers.jpg',
        thumbnail: 'thumbnail-deers.jpg'
      },
      material: 'Cotton',
      available: true,
      handmade: false
    }
  }
};
