const mockId = '88cb31bf8e5ea5af3014e342';

const mockMaterials = {
  items: [
    {
      _id: mockId,
      name: [
        {
          lang: 'uk',
          value: 'Натуральна шкіра'
        },
        {
          lang: 'en',
          value: 'Genuine leather'
        }
      ],
      description: [
        {
          lang: 'uk',
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
          value: 35000
        },
        {
          value: 1262
        }
      ],
      colors: mockColors,
      purpose: 'bottom'
    }
  ],
  count: 1
};

const mockColorCode = 200;

const mockMaterial = mockMaterials.items[0];

const mockColors = [
  {
    code: mockColorCode,
    available: true,
    name: [
      {
        value: 'Світло-коричневий',
        lang: 'uk'
      },
      {
        value: 'Light-brown',
        lang: 'en'
      }
    ],
    simpleName: [
      {
        value: 'коричневий',
        lang: 'uk'
      },
      {
        value: 'brown',
        lang: 'en'
      }
    ]
  }
];

const mockColor = mockColors[0];

const mockMaterialState = {
  list: [],
  material: null,
  materialLoading: false,
  materialError: null,
  pagination: {
    currentPage: 0,
    materialsPerPage: 6,
    pagesCount: 1
  },
  showColorDialogWindow: false,
  colors: [],
  materialColors: null,
  materialColor: null,
  editMaterialId: ''
};

const mockSnackbarState = {
  snackBarStatus: false,
  snackBarSeverity: '',
  snackBarMessage: ''
};

const mockMaterialsLoadPayload = {
  skip: 0,
  limit: 10,
  materialsPerPage: 10
};

const mockMaterialsPagesCount = Math.ceil(
  mockMaterials.count / mockMaterialsLoadPayload.materialsPerPage
);

const mockMaterialStateWithColors = {
  ...mockMaterialState,
  colors: [mockColor]
};

const mockColorToAdd = {
  id: mockId,
  color: mockColor
};

const mockPayloadToDeleteColor = {
  id: mockId,
  code: mockColorCode
};

const mockPayloadToUpdateMaterial = {
  id: mockId,
  material: mockMaterial,
  images: ['image']
};

const mockError = {
  message: 'error'
};

const statuses = {
  SUCCESS_ADD_STATUS: 'Успішно додано!',
  SUCCESS_DELETE_STATUS: 'Успішно видалено!',
  SUCCESS_UPDATE_STATUS: 'Успішно змінено!'
};

export {
  mockId,
  mockMaterial,
  mockMaterials,
  mockMaterialState,
  mockSnackbarState,
  mockMaterialsLoadPayload,
  mockMaterialsPagesCount,
  mockColors,
  mockColorCode,
  mockColor,
  statuses,
  mockMaterialStateWithColors,
  mockColorToAdd,
  mockPayloadToDeleteColor,
  mockPayloadToUpdateMaterial,
  mockError
};
