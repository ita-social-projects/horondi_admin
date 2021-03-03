const mockId = '88cb31bf8e5ea5af3014e657';

const mockSizes = {
  items: [
    {
      _id: mockId,
      name: [
        {
          lang: 'ua',
          value: 'large'
        },
        {
          lang: 'en',
          value: 'великий'
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
      sizes: []
    }
  ]
};

const mockSize = mockSizes.items[0];

const sizesArr = [mockSize];

const mockError = {
  message: 'error'
};

const mockSizesState = {
  list: [],
  size: null,
  showSizeDialogWindow: false,
  showBoundMaterialsWindow: false,
  boundSizes: null,
  sizeLoading: false,
  sizeError: null,
  sizesLoading: false
};

const mockPayloadToUpdateSize = {
  id: mockId,
  size: mockSize
};

const statuses = {
  SUCCESS_ADD_STATUS: 'Успішно додано!',
  SUCCESS_DELETE_STATUS: 'Успішно видалено!'
};

module.exports = {
  mockId,
  mockSize,
  mockSizes,
  mockError,
  mockSizesState,
  statuses,
  sizesArr,
  mockPayloadToUpdateSize
};
