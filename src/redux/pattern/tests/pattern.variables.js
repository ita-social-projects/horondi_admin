const uaDescriptionBase = 'Фабричний гобелен із зображенням';
const enDescriptionBase = 'Manufactured tapestry with';

const mockId = '0c3c7929dd85de268bed4fe8';

const mockPatterns = {
  items: [
    {
      _id: mockId,
      description: [
        {
          value: `${uaDescriptionBase} рожевої хвильки`
        },
        {
          value: `${enDescriptionBase} pink wave pattern`
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
    }
  ],
  count: 1
};

const mockPattern = mockPatterns.items[0];

const mockPatternsState = {
  list: [],
  pattern: null,
  patternLoading: false,
  patternError: null,
  pagination: {
    currentPage: 0,
    patternsPerPage: 6,
    pagesCount: 1
  }
};

const mockInputPattern = {
  id: mockId,
  pattern: mockPattern,
  image: {
    file: 'some image file'
  }
};

const mockPatternsLoadPayload = {
  skip: 0,
  limit: 6,
  patternsPerPage: 6
};

const pagesCount = Math.ceil(
  mockPatterns.count / mockPatternsLoadPayload.patternsPerPage
);

const mockSnackarState = {
  snackBarStatus: false,
  snackBarSeverity: '',
  snackBarMessage: ''
};

const statuses = {
  SUCCESS_ADD_STATUS: 'Успішно додано!',
  SUCCESS_DELETE_STATUS: 'Успішно видалено!',
  SUCCESS_UPDATE_STATUS: 'Успішно змінено!'
};

const mockError = {
  message: 'error'
};

export {
  mockPatternsState,
  mockPatternsLoadPayload,
  mockPatterns,
  pagesCount,
  mockId,
  mockPattern,
  mockSnackarState,
  statuses,
  mockInputPattern,
  mockError
};
