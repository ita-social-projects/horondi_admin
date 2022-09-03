export const initialState = {
  Material: {
    materialLoading: false,
    materialsByPurpose: {
      bottom: [
        {
          _id: '6043aaab3e06ad3edcdb7b11',
          name: [
            {
              lang: 'ua',
              value: 'Шкірзамінник'
            },
            {
              lang: 'en',
              value: 'Leatherette'
            }
          ],
          colors: [
            {
              _id: '6043a9cc3e06ad3edcdb7b0e',
              name: [
                {
                  value: 'Чорний'
                },
                {
                  value: 'Black'
                }
              ]
            },
            {
              _id: '6043aa9c3e06ad3edcdb7b10',
              name: [
                {
                  value: 'Коричневий'
                },
                {
                  value: 'Brown'
                }
              ]
            },
            {
              _id: '608a94823d21be0964c81193',
              name: [
                {
                  value: 'Рожевий'
                },
                {
                  value: 'Pink'
                }
              ]
            }
          ]
        }
      ]
    }
  },
  Bottom: {
    list: [],
    bottomLoading: false
  },
  Currencies: {
    exchangeRate: 1
  }
};
