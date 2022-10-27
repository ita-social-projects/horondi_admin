export const sizeToUpdate = {
  _id: '123',
  name: 'M',
  heightInCm: 5,
  available: true
};

export const update = { name: 'S' };

export const initialSizes = [sizeToUpdate];

export const newSize = {
  _id: 'size_1',
  name: 'XL',
  heightInCm: 6,
  available: false
};
export const dispatch = jest.fn();
export const products = [];
export const productWhithSize = [
  { sizes: [{ size: { _id: '123' } }], name: [{ value: 'Роллтоп' }] }
];
