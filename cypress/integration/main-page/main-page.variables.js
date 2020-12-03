export const orders = {
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
