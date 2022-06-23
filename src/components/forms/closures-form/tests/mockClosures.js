const target = { target: { result: 'foo' } };

const files = [new File([], 'foo,png', { type: 'image' })];

const mockedinitialValues = {
  _id: '6043c8acc60c2e4b940189ae',
  name: [
    {
      lang: 'ua',
      value: 'Защіпки'
    },
    {
      lang: 'en',
      value: 'Backstop'
    }
  ],
  available: true,
  optionType: 'CLOSURE',
  images: {
    large: 'large_byy9rkksa3ukbh_144.jpg',
    medium: 'medium_byy9rkksa3ukbh_144.jpg',
    small: 'small_byy9rkksa3ukbh_144.jpg',
    thumbnail: 'thumbnail_byy9rkksa3ukbh_144.jpg'
  },
  absolutePrice: null,
  relativePrice: 6
};

module.exports = {
  target,
  files,
  mockedinitialValues
};
