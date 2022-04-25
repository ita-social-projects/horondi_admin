const filterLabels = {
  categories: {
    sortLabels: [
      {
        value: 'sortByNameAsc',
        label: "за ім'ям (у алфавітному порядку)",
        key: 'name',
        type: 'asc'
      },
      {
        value: 'sortByNameDesc',
        label: "за ім'ям (проти алфавітного порядку)",
        key: 'name',
        type: 'desc'
      }
    ]
  },
  models: {
    sortLabels: [
      {
        value: 'sortByNameAsc',
        label: "за ім'ям (у алфавітному порядку)",
        key: 'name',
        type: 'asc'
      },
      {
        value: 'sortByNameDesc',
        label: "за ім'ям (проти алфавітного порядку)",
        key: 'name',
        type: 'desc'
      },
      {
        value: 'sortByPriorityAsc',
        label: 'за пріоритетом (від найнижчого до найвищого) ',
        key: 'priority',
        type: 'desc'
      },
      {
        value: 'sortByPriorityDesc',
        label: 'за пріоритетом (від найвищого до найнижчого)',
        key: 'priority',
        type: 'asc'
      }
    ]
  },
  orders: {
    users: [
      {
        value: 'sortByNameAsc',
        label: "за ім'ям (у алфавітному порядку)",
        key: 'name',
        type: 'asc'
      },
      {
        value: 'sortByNameDesc',
        label: "за ім'ям (проти алфавітного порядку)",
        key: 'name',
        type: 'desc'
      },
      {
        value: 'sortByEmailAsc',
        label: 'за поштою (у алфавітному порядку)',
        key: 'email',
        type: 'asc'
      },
      {
        value: 'sortByEmailDesc',
        label: 'за поштою (проти алфавітного порядку)',
        key: 'email',
        type: 'desc'
      }
    ],
    sortLabels: [
      {
        value: 'sortByTotalPriceToPayAsc',
        label: 'за вартістю товару (по зростанню)',
        key: 'totalPriceToPay.0.value',
        type: 'asc'
      },
      {
        value: 'sortByTotalPriceToPayDesc',
        label: 'за вартістю товару (по спаданню)',
        key: 'totalPriceToPay.0.value',
        type: 'desc'
      },
      {
        value: 'sortByCreatedAtAsc',
        label: 'від старих до нових',
        key: 'dateOfCreation',
        type: 'asc'
      },
      {
        value: 'sortByCreatedDesc',
        label: 'від нових до старих',
        key: 'dateOfCreation',
        type: 'desc'
      }
    ]
  },
  products: {
    sortLabels: [
      {
        value: 'sortByRateAsc',
        label: 'за рейтингом (по зростанню)',
        key: 'rate',
        type: 'asc'
      },
      {
        value: 'sortByRateDesc',
        label: 'за рейтингом (по спаданню)',
        key: 'rate',
        type: 'desc'
      },
      {
        value: 'sortByPurchasedCountAsc',
        label: 'за кількістю покупок (по зростанню)',
        key: 'purchasedCount',
        type: 'asc'
      },
      {
        value: 'sortByPurchasedCountDesc',
        label: 'за кількістю покупок (по спаданню)',
        key: 'purchasedCount',
        type: 'desc'
      }
    ]
  },
  certificates: {
    sortLabels: [
      {
        value: 'sortByPriceAsc',
        label: 'за вартістю (по зростанню)',
        key: 'value',
        type: 'asc'
      },
      {
        value: 'sortByPriceDesc',
        label: 'за вартістю (по спаданню)',
        key: 'value',
        type: 'desc'
      }
    ]
  },
  comments: {
    sortLabels: [
      {
        value: 'sortByDateAsc',
        label: 'за датою (від старішого до новішого)',
        key: 'date',
        type: 'asc'
      },
      {
        value: 'sortByDateDesc',
        label: 'за датою (від новішого до старішого)',
        key: 'date',
        type: 'desc'
      },
      {
        value: 'sortByReplyAsc',
        label: 'за датою відповідей (від старішого до новішого)',
        key: 'replyComments',
        type: 'asc'
      },
      {
        value: 'sortByReplyDesc',
        label: 'за датою відповідей (від новішого до старішого)',
        key: 'replyComments',
        type: 'desc'
      }
    ]
  },
  reply: {
    sortLabels: [
      {
        value: 'sortByDateAsc',
        label: 'за датою (від старішого до новішого)',
        key: 'date',
        type: 'asc'
      },
      {
        value: 'sortByDateDesc',
        label: 'за датою (від новішого до старішого)',
        key: 'date',
        type: 'desc'
      }
    ]
  }
};

export default filterLabels;
