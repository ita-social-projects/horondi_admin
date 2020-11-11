export const operationsAllOrdersLimit = 5;
export const operationsAllOrdersSkip = 0;
export const operationsAllOrdersFilter = {
  orderStatus: ['DELIVERED']
};

export const expectedResultOperationsAllOrders = {
  data: {
    getAllOrders: {
      ...setOrderListFakeData
    }
  }
};

export const getOrderListFakeData = {
  limit: 5,
  skip: 0,
  filter: {
    orderStatus: 'DELIVERED'
  }
};

export const getOrderListFakeDataSaga = {
  limit: 5,
  skip: 0,
  filter: {
    orderStatus: 'DELIVERED'
  }
};

export const setOrderListFakeData = {
  items: [
    {
      _id: '29c7214c0bd65f0807caf95b',
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
      _id: 'd30c9fd30b31356c4a4f3910',
      status: 'DELIVERED',
      dateOfCreation: '1602943280234',
      totalItemsPrice: [
        {
          currency: 'UAH',
          value: 280000
        },
        {
          currency: 'USD',
          value: 10097
        }
      ],
      totalPriceToPay: [
        {
          currency: 'UAH',
          value: 285000
        },
        {
          currency: 'USD',
          value: 10278
        }
      ]
    }
  ],
  count: 941
};

export const fakeOrders = {
  data: {
    getAllOrders: {
      ...setOrderListFakeData
    }
  }
};

export const getOrdersFakeError = {
  message: 'ORDERS_NOT_FOUND'
};

export const fakeId = '29c7214c0bd65f0807caf95b';
export const fakeIdOrder = {
  data: {
    getOrderById: {
      _id: '29c7214c0bd65f0807caf95b',
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
