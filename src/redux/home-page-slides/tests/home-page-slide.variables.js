const mockSlidesState = {
  list: [],
  drugAndDropList: [],
  availableSlides: [],
  slide: null,
  slideLoading: false,
  slideError: null,
  pagination: {
    currentPage: 0,
    slidesPerPage: 4,
    pagesCount: 1
  },
  editStatus: false
};

const mockId = '5fa034049a59a906f0610e5c';

const mockSlides = {
  count: 1,
  items: [
    {
      description: [
        { value: '-20 на всі гаманці', lang: 'ua' },
        { value: '-20 for all wallets', lang: 'en' }
      ],
      images: {
        large: 'large_10b1e9gkhm7oz20_Untitled-3.jpg',
        thumbnail: 'thumbnail_10b1e9gkhm7oz20_Untitled-3.jpg'
      },
      link: '/bags',
      order: 1,
      show: true,
      title: [
        {
          lang: 'ua',
          value: 'Акція '
        },
        {
          lang: 'en',
          value: 'Discount'
        }
      ],
      _id: mockId
    }
  ]
};

const mockGetSlidesPayload = {
  limit: 4,
  skip: 0,
  slidesPerPage: 4
};

const mockError = {
  message: 'error'
};

const mockSlide = mockSlides.items[0];

const mockDragAndDropList = [
  {
    items: mockSlides.items,
    title: 'available'
  },
  {
    items: [],
    title: 'nonAvailable'
  }
];

const mockEmptyDragAndDropList = [
  {
    items: [],
    title: 'available'
  },
  {
    items: [],
    title: 'nonAvailable'
  }
];

const mockSlideToAdd = {
  slide: mockSlide,
  upload: ['some info']
};

const mockSlideUpdate = {
  id: mockId,
  slide: mockSlide,
  upload: ['some info']
};

const pageCount = Math.ceil(
  mockSlides.count / mockGetSlidesPayload.slidesPerPage
);

const mockNumber = 2;

export {
  mockId,
  mockSlides,
  mockGetSlidesPayload,
  mockError,
  mockDragAndDropList,
  mockSlide,
  mockSlideUpdate,
  mockEmptyDragAndDropList,
  pageCount,
  mockSlidesState,
  mockSlideToAdd,
  mockNumber
};
