const mockId = '88cb31bf8e5ea5af3014e342';

const mockMaterials = {
  items: [
    {
      _id: mockId,
      name: [
        {
          lang: 'ua',
          value: 'Натуральна шкіра'
        },
        {
          lang: 'en',
          value: 'Genuine leather'
        }
      ],
      description: [
        {
          lang: 'ua',
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
      colors: [],
      purpose: 'bottom'
    }
  ],
  count: 1
};

const mockMaterial = mockMaterials.items[0];

const mockMaterialState = {
  list: [],
  material: null,
  materialLoading: false,
  materialError: null,
  showColorDialogWindow: false,
  colors: [],
  materialColors: null,
  materialColor: null,
  editMaterialId: ''
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

const mockMaterialsLoadPayload = {
  filter: {
    colors: []
  },
  skip: 0,
  limit: 10,
  materialsPerPage: 10
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
  mockMaterialsLoadPayload,
  statuses,
  mockPayloadToUpdateMaterial,
  mockError,
  mockTableState
};
