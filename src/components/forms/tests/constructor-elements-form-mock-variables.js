const target = { target: { result: 'foo' } };

const mockMaterial = {
  details: {
    bottom: [
      {
        _id: '60edccb05167a43c603bd939',
        name: [{ value: 'Сітка' }, { value: 'Grid' }],
        colors: [
          {
            _id: '6043a9cc3e06ad3edcdb7b0e',
            name: [{ value: 'Чорний' }, { value: 'Black' }]
          }
        ]
      }
    ]
  },
  loading: false
};
const files = [new File([], 'foo,png', { type: 'image' })];
module.exports = {
  mockMaterial,
  target,
  files
};
