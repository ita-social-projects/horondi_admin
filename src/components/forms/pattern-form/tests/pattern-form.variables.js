const mockPattern = {
  _id: '619e24c25bbfb00025409bf3',
  name: [
    {
      value: 'Червоний'
    },
    {
      value: 'Red'
    }
  ],
  description: [
    {
      value: 'Даний гобелен чудово підійде під ваш стиль'
    },
    {
      value: 'This tapestry will perfectly suit your style'
    }
  ],
  model: {
    _id: '6043bf9e3e06ad3edcdb7b30'
  },
  features: {
    material: {
      _id: '6043b2ec3e06ad3edcdb7b17',
      name: [
        {
          lang: 'ua',
          value: 'Нитки для шиття'
        },
        {
          lang: 'en',
          value: 'Threads for sewing'
        }
      ]
    },
    handmade: false
  },
  available: true,
  images: {
    thumbnail: 'thumbnail_eewk311kwdggeyx_158.jpg'
  },
  constructorImg: 'small_eewk311kwdgh3ty_гобелен-5.png',
  absolutePrice: 0,
  relativePrice: null
};

const mockMaterials = [
  {
    _id: '6043b2ec3e06ad3edcdb7b17',
    name: [
      {
        lang: 'ua',
        value: 'Нитки для шиття'
      },
      {
        lang: 'en',
        value: 'Threads for sewing'
      }
    ]
  },
  {
    _id: '613f82e71b869a0024e2d827',
    name: [
      {
        lang: 'ua',
        value: 'джинс'
      },
      {
        lang: 'en',
        value: 'jeans'
      }
    ]
  }
];

const mockList = [
  {
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
    ]
  },
  {
    _id: '6043c1223e06ad3edcdb7b31',
    name: [
      {
        lang: 'ua',
        value: 'Гарбуз'
      },
      {
        lang: 'en',
        value: 'Pumpkin'
      }
    ],
    category: {
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
    images: {
      large: 'large_id73cf0kly0wqne_гарбуз.png',
      medium: 'medium_id73cf0kly0wqne_гарбуз.png',
      small: 'small_id73cf0kly0wqne_гарбуз.png',
      thumbnail: 'thumbnail_id73cf0kly0wqne_гарбуз.png'
    },
    priority: 1,
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
    ]
  }
];

const mockIsEdit = true;

module.exports = {
  mockPattern,
  mockMaterials,
  mockList,
  mockIsEdit
};
