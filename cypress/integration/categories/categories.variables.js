export const allCategories = [
  {
    _id: 1,
    code: 'main-bags',
    name: [{ lang: 'ua', value: 'Сумки' }],
    images: {
      large: '1.png',
      medium: '2.png',
      small: '3.png',
      thumbnail: '4.png'
    },
    subcategories: 3,
    isMain: true,
    available: true
  },
  {
    _id: 2,
    code: 'main-backpacks',
    name: [{ lang: 'ua', value: 'Рюкзаки' }],
    images: {
      large: '1.png',
      medium: '2.png',
      small: '3.png',
      thumbnail: '4.png'
    },
    subcategories: 2,
    isMain: true,
    available: true
  },
  {
    _id: 3,
    code: 'none',
    name: [{ lang: 'ua', value: 'Нема' }],
    images: {
      large: '1.png',
      medium: '2.png',
      small: '3.png',
      thumbnail: '4.png'
    },
    subcategories: 1,
    isMain: true,
    available: true
  }
];
