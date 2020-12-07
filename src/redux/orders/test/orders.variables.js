export const fakeOrderState = {
  list: [],
  selectedOrder: null,
  orderLoading: false,
  orderError: null
};

export const fakeTableState = {
  dense: false,
  pagination: {
    currentPage: 0,
    rowsPerPage: 10,
    rowsPerPageOptions: [10, 20, 30],
    pagesCount: 1
  },
  itemsCount: 0
};

export const fakeSnackarState = {
  snackBarStatus: false,
  snackBarSeverity: '',
  snackBarMessage: ''
};

export const fakeOrderList = {
  items: [
    {
      _id: fakeId,
      status: 'DELIVERED',
      dateOfCreation: '1603980848358',
      totalItemsPrice: [
        {
          currency: 'UAH',
          value: 255000
        },
        {
          currency: 'USD',
          value: 9196
        }
      ],
      totalPriceToPay: [
        {
          currency: 'UAH',
          value: 260000
        },
        {
          currency: 'USD',
          value: 9376
        }
      ]
    },
    {
      _id: 'f3324165d014a9de67078080',
      status: 'DELIVERED',
      dateOfCreation: '1603957246061',
      totalItemsPrice: [
        {
          currency: 'UAH',
          value: 205000
        },
        {
          currency: 'USD',
          value: 7393
        }
      ],
      totalPriceToPay: [
        {
          currency: 'UAH',
          value: 210000
        },
        {
          currency: 'USD',
          value: 7573
        }
      ]
    },
    {
      _id: '53407c59890642fdeb5e86e0',
      status: 'DELIVERED',
      dateOfCreation: '1603914198703',
      totalItemsPrice: [
        {
          currency: 'UAH',
          value: 145000
        },
        {
          currency: 'USD',
          value: 5229
        }
      ],
      totalPriceToPay: [
        {
          currency: 'UAH',
          value: 150000
        },
        {
          currency: 'USD',
          value: 5409
        }
      ]
    },
    {
      _id: '3b5317143d468b1e5560a80c',
      status: 'DELIVERED',
      dateOfCreation: '1603814854142',
      totalItemsPrice: [
        {
          currency: 'UAH',
          value: 50000
        },
        {
          currency: 'USD',
          value: 1803
        }
      ],
      totalPriceToPay: [
        {
          currency: 'UAH',
          value: 55000
        },
        {
          currency: 'USD',
          value: 1983
        }
      ]
    },
    {
      _id: '29faced3722c5801322fe3a4',
      status: 'DELIVERED',
      dateOfCreation: '1603595559611',
      totalItemsPrice: [
        {
          currency: 'UAH',
          value: 275000
        },
        {
          currency: 'USD',
          value: 9917
        }
      ],
      totalPriceToPay: [
        {
          currency: 'UAH',
          value: 280000
        },
        {
          currency: 'USD',
          value: 10097
        }
      ]
    }
  ],
  count: 941
};

export const getFakeOrderList = {
  limit: 5,
  skip: 0,
  filter: {
    orderStatus: 'DELIVERED'
  }
};

export const fakeId = '29c7214c0bd65f0807caf95b';
export const fakeIdOrder = {
  data: {
    getOrderById: {
      _id: fakeId,
      status: 'DELIVERED',
      user: {
        firstName: 'Аркадій',
        lastName: 'Неплюєв',
        patronymicName: 'Іванович',
        email: 'rtxqg2sozo@meta.ua',
        phoneNumber: '38068617237'
      },
      dateOfCreation: '1603980848358',
      lastUpdatedDate: '1604326448358',
      adminComment: '',
      userComment: '',
      cancellationReason: '',
      delivery: {
        sentOn: '1604067248358',
        sentBy: 'Nova Poshta',
        invoiceNumber: '9664161',
        courierOffice: 12,
        byCourier: true,
        cost: [
          {
            currency: 'UAH',
            value: 5000
          },
          {
            currency: 'USD',
            value: 180
          }
        ]
      },
      address: {
        country: 'Україна',
        region: 'Одеська область',
        city: 'Кодима',
        zipcode: '23492',
        street: 'Соляна вулиця',
        buildingNumber: '103',
        appartment: '131'
      },
      items: [
        {
          name: [
            {
              lang: 'uk',
              value: 'Сумка з гобеленом синя'
            },
            {
              lang: 'en',
              value: 'Bag with a Pattern Blue'
            }
          ]
        },
        {
          name: [
            {
              lang: 'uk',
              value: 'Новий червоний 2'
            },
            {
              lang: 'en',
              value: 'New Red 2'
            }
          ]
        }
      ],
      totalItemsPrice: [
        {
          currency: 'UAH',
          value: 255000
        },
        {
          currency: 'USD',
          value: 9196
        }
      ],
      totalPriceToPay: [
        {
          currency: 'UAH',
          value: 260000
        },
        {
          currency: 'USD',
          value: 9376
        }
      ],
      isPaid: true,
      paymentMethod: 'CARD'
    }
  }
};

export const fakeError = {
  message: 'ORDERS_NOT_FOUND'
};
