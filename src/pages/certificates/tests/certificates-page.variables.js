export const fakeCertificatesState = {
  list: {
    count: 3,
    items: [
      {
        _id: '61e04efaedc3271854cf4f38',
        name: '01FreeHorondi',
        value: 1000,
        createdBy: {
          _id: '5fbe46259e79126198841b3e'
        },
        isActivated: true,
        isUsed: false,
        dateStart: '2022-01-13T16:10:29.323Z',
        dateEnd: '2023-01-14T16:10:29.323Z'
      },
      {
        _id: '61e04efaedc3271854cf4f32',
        name: '02FreeHorondi',
        value: 1500,
        createdBy: {
          _id: '5fcfc2c5823c593d1c28c459'
        },
        isActivated: false,
        isUsed: true,
        dateStart: '2022-01-13T16:10:29.323Z',
        dateEnd: '2023-01-14T16:10:29.323Z'
      },
      {
        _id: '61e1591b7908b669fca1b651',
        name: '03FreeHorondi',
        value: 500,
        createdBy: {
          _id: '5fcfc2c5823c593d1c28c459'
        },
        isActivated: false,
        isUsed: false,
        dateStart: '2022-01-13T16:10:29.323Z',
        dateEnd: '2023-01-14T16:10:29.323Z'
      }
    ]
  },
  certificatesLoading: false
};

export const fakeEmptyCertificatesState = {
  list: {
    count: 0,
    items: []
  },
  certificatesLoading: false
};

export const fakeUserState = {
  list: [
    {
      _id: '5fcfc2c5823c593d1c28c459',
      firstName: 'Ivan',
      lastName: 'Bonk'
    },
    {
      _id: '5fbe46259e79126198841b3e',
      firstName: 'Денис',
      lastName: 'Коропалов'
    }
  ],
  usersLoading: false
};

export const fakeTableState = { dense: false };
