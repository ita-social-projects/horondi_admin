export const materialToUpdateDeleteId = '88cb31bf8e5ea5af3014e342';
export const fakeId = '11cb36bf1e5ea5af3014e312';
const UA = UA;
export const material = {
  name: [
    {
      lang: UA,
      value: 'Тканина Кордура'
    },
    {
      lang: 'en',
      value: 'Cordura fabric'
    }
  ],
  description: [
    {
      lang: UA,
      value: 'test'
    },
    {
      lang: 'en',
      value: 'test'
    }
  ],
  available: true,
  additionalPrice: [
    {
      value: 0
    },
    {
      value: 0
    }
  ],
  colors: [
    {
      available: true,
      simpleName: [
        {
          lang: UA,
          value: 'чорний'
        },
        {
          lang: 'en',
          value: 'black'
        }
      ],
      images: {
        medium: 'medium_black'
      }
    }
  ],
  purpose: 'bottom'
};
export const materials = [
  {
    _id: '88cb31bf8e5ea5af3014e342',
    ...material
  },
  {
    _id: '56ade69dd46eafc5968e5390',
    ...material
  },
  {
    _id: '1d2bba5d0b80938327ac9012',
    ...material
  }
];

export const newColor = {
  code: 200,
  name: [
    {
      lang: UA,
      value: 'Світло-коричневий'
    },
    {
      lang: 'en',
      value: 'Light-brown'
    }
  ],
  simpleName: [
    {
      lang: UA,
      value: 'коричневий'
    },
    {
      lang: 'en',
      value: 'brown'
    }
  ],
  available: true,
  images: {
    large: 'large_light-brown',
    medium: 'medium_light-brown',
    small: 'small_light-brown',
    thumbnail: 'thumbnail_light-brown'
  }
};
