const target = { target: { result: 'foo' } };
const files = [new File([], 'foo.png', { type: 'image' })];

const User = {
  list: [
    {
      _id: '',
      name: [
        {
          lang: '',
          value: ''
        },
        {
          lang: '',
          value: ''
        }
      ],
      image: '',
      optionType: null,
      additionalPrice: [
        { value: null, currency: '' },
        { value: null, currency: '' }
      ],
      features: {
        color: { _id: '' }
      },
      available: false
    }
  ]
};

module.exports = {
  User,
  target,
  files
};
