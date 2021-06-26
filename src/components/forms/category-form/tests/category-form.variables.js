const mockCategory = {
  _id: '1322315645648',
  name: [
    {
      value: 'гаманець'
    },
    {
      value: 'purse'
    }
  ],
  code: '',
  images: {
    thumbnail: ''
  },
  available: false
};
const mockId = '6047321793650236ddbfb841';
const mockIsEdit = false;
const event = {
  target: {
    files: [new File([], 'foo,png', { type: 'image' })]
  }
};
const target = { target: { result: 'foo' } };

module.exports = {
  mockCategory,
  mockId,
  mockIsEdit,
  event,
  target
};
