const mockId = '5fa034049a59a906f0610e42';

const mockModelState = {
  list: [],
  model: null,
  modelLoading: false,
  modelError: null
};

const mockTableState = {
  dense: false,
  pagination: {
    currentPage: 0,
    rowsPerPage: 10,
    rowsPerPageOptions: [10, 20, 30]
  },
  itemsCount: 0
};

const mockSnackbarState = {
  snackBarStatus: false,
  snackBarSeverity: '',
  snackBarMessage: ''
};

const mockModelsLoadPayload = {
  limit: 6,
  modelsPerPage: 6,
  skip: 0
};
const mockModels = {
  items: [
    {
      _id: mockId,
      category: {
        name: [
          {
            lang: 'ua',
            value: 'Рюкзаки'
          },
          {
            lang: 'en',
            value: 'Backpacks'
          }
        ]
      },
      description: [
        {
          lang: 'ua',
          value:
            '<ul>\r    <li>Ззовні: передня кишеня - 20х20 та потаємна кишеня на спинці на замочку;</li>\r    <li>Всередині два відділення: одне для ноутбука захищене стінкою з піноматеріалу та додаткова кишенька для дрібничок;</li>\r    <li>Головне відділення закривається на замок та дві защіпки;</li>\r    <li>Спинка зроблена з використанням піноматеріалу.</li>\r</ul>'
        },
        {
          lang: 'en',
          value:
            '<ul>\r    <li>Outside: Front pocket 20x20 cm and a zipped hidden pocket on the back;</li>\r    <li>Two compartments on the inside: Laptop compartment protected with foam-wall and one more pocket for knickknacks;</li>\r    <li>Main compartment closes with a zipper and two closures;</li>\r    <li>The back is padded with foam.</li>\r</ul>'
        }
      ],
      images: {
        small: 'small_10b1e9gkhm8gn4h_rolltop.jpg',
        medium: 'medium_10b1e9gkhm8gn4h_rolltop.jpg',
        large: 'large_10b1e9gkhm8gn4h_rolltop.jpg',
        thumbnail: 'thumbnail_10b1e9gkhm8gn4h_rolltop.jpg'
      },
      name: [
        {
          lang: 'ua',
          value: 'Ролтоп'
        },
        {
          lang: 'en',
          value: 'Rolltop'
        }
      ],
      priority: 1,
      show: true
    }
  ],
  count: 1
};

const mockModel = mockModels.items[0];

const mockError = {
  message: 'error'
};

const statuses = {
  SUCCESS_ADD_STATUS: 'Успішно додано!',
  SUCCESS_DELETE_STATUS: 'Успішно видалено!',
  SUCCESS_UPDATE_STATUS: 'Успішно змінено!'
};

const mockModelToUpdate = {
  id: mockId,
  model: mockModel,
  image: ['image']
};

const pagesCount = Math.ceil(
  mockModels.count / mockModelsLoadPayload.modelsPerPage
);

export {
  mockId,
  mockModels,
  mockModel,
  mockModelsLoadPayload,
  mockError,
  statuses,
  mockModelState,
  mockSnackbarState,
  pagesCount,
  mockModelToUpdate,
  mockTableState
};
