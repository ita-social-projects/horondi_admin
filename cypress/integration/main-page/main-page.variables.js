export const orders = {
  count: 10,
  items: [
    {
      _id: '5fc8a0f29bbdc1403058486f',
      status: 'CREATED',
      dateOfCreation: '1606983922161',
      totalItemsPrice: [
        {
          currency: 'UAN',
          value: 2000
        },
        {
          currency: 'USD',
          value: 180000
        }
      ],
      totalPriceToPay: [
        {
          currency: 'UAN',
          value: 2000
        },
        {
          currency: 'USD',
          value: 180000
        }
      ]
    },
    {
      _id: '5fc78f6b5ff3db6b5c2d005d',
      status: 'CREATED',
      dateOfCreation: '1606913899549',
      totalItemsPrice: [
        {
          currency: 'UAH',
          value: 0
        },
        {
          currency: 'USD',
          value: 0
        }
      ],
      totalPriceToPay: [
        {
          currency: 'UAH',
          value: 2
        },
        {
          currency: 'USD',
          value: 0
        }
      ]
    },
    {
      _id: '5fc78f6a5ff3db6b5c2d0054',
      status: 'CREATED',
      dateOfCreation: '1606913898685',
      totalItemsPrice: [
        {
          currency: 'UAH',
          value: 0
        },
        {
          currency: 'USD',
          value: 0
        }
      ],
      totalPriceToPay: [
        {
          currency: 'UAH',
          value: 2
        },
        {
          currency: 'USD',
          value: 0
        }
      ]
    },
    {
      _id: '5fc78f685ff3db6b5c2d004b',
      status: 'CREATED',
      dateOfCreation: '1606913896572',
      totalItemsPrice: [
        {
          currency: 'UAH',
          value: 0
        },
        {
          currency: 'USD',
          value: 0
        }
      ],
      totalPriceToPay: [
        {
          currency: 'UAH',
          value: 2
        },
        {
          currency: 'USD',
          value: 0
        }
      ]
    },
    {
      _id: '5fc7883259e4ab15583f6c6b',
      status: 'CREATED',
      dateOfCreation: '1606912050828',
      totalItemsPrice: [
        {
          currency: 'UAH',
          value: 0
        },
        {
          currency: 'USD',
          value: 0
        }
      ],
      totalPriceToPay: [
        {
          currency: 'UAH',
          value: 2
        },
        {
          currency: 'USD',
          value: 0
        }
      ]
    },
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
  ]
};

export const getAllOrders = (req) => {
  req.reply({
    body: {
      data: {
        getAllOrders: orders
      }
    }
  });
};
