const mockStore = {
  list: [
    {
      _id: '6043b87c3e06ad3edcdb7b19',
      name: [
        {
          lang: 'ua',
          value: 'Червоний'
        },
        {
          lang: 'en',
          value: 'Red'
        }
      ],
      optionType: 'PATTERN',
      model: {
        _id: '6043bf9e3e06ad3edcdb7b30',
        category: {
          _id: '6043bdeb3e06ad3edcdb7b2d',
          code: 'backpacks'
        },
        name: [
          {
            lang: 'ua'
          },
          {
            lang: 'en'
          }
        ],
        description: [
          {
            lang: 'ua',
            value:
              '<p>Крутий рюкзак який класно підійде для прогулянки містом та подорожей</p>'
          },
          {
            lang: 'en',
            value:
              '<p>A cool backpack that is great for walking around the city and traveling</p>'
          }
        ]
      },
      features: {
        material: {
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
      description: [
        {
          lang: 'ua',
          value: 'Даний гобелен чудово підійде під ваш стиль'
        },
        {
          lang: 'en',
          value: 'This tapestry will perfectly suit your style'
        }
      ],
      images: {
        thumbnail: 'thumbnail_id73cf0klxzl60n_149-min.jpg',
        medium: 'medium_id73cf0klxzl60n_149-min.jpg',
        small: 'small_id73cf0klxzl60n_149-min.jpg',
        large: 'large_id73cf0klxzl60n_149-min.jpg'
      },
      constructorImg: 'small_id73cf0klxzlbi8_гобелен-2.png',
      additionalPrice: [],
      available: true,
      customizable: true
    }
  ],
  loading: false,
  currentPage: 0,
  rowsPerPage: 10,
  itemsCount: 7
};

export default mockStore;
