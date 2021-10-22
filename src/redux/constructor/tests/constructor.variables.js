const mockId = '6047321793650236ddbfb842';

const mockConstructors = {
  items: [
    {
      _id: mockId,
      model: '6047321393650236ddbfb842',
      name: [
        {
          lang: 'ua',
          value: 'модель'
        },
        {
          lang: 'en',
          value: 'model'
        }
      ]
    }
  ],
  count: 6
};

export const mockConstructor = {
  items: mockConstructors.items,
  count: 1
};

const initialFilters = {
  name: ''
};

const mockConstructorsState = {
  list: [],
  sort: {
    name: 1
  },
  filters: initialFilters,
  constructor: null,
  constructorLoading: false,
  constructorError: null
};

const mockInputConstructor = {
  id: mockId,
  constructor: mockConstructor
};

const mockConstructorsLoadPayload = {
  limit: 1,
  skip: 0,
  filter: initialFilters
};

const statuses = {
  SUCCESS_ADD_STATUS: 'Успішно додано!',
  SUCCESS_DELETE_STATUS: 'Успішно видалено!',
  SUCCESS_UPDATE_STATUS: 'Успішно змінено!'
};

export {
  mockConstructorsState,
  mockConstructorsLoadPayload,
  mockConstructors,
  mockId,
  statuses,
  mockInputConstructor
};
