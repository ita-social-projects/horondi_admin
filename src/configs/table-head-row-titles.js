const tableHeadRowTitles = {
  history: [
    'Дата створення',
    'За подією',
    "За ім'ям",
    "Ім'я користувача",
    'Роль користувача',
    "Об'єкт дії",
    'Деталі'
  ],

  aboutUsHeaderTitles: ['Основний заголовок сторінки', 'Дії'],
  aboutUsTitles: ['Заголовок', 'Текст', 'Зображення', 'Дії'],
  aboutUsFooterTitles: ['Зображення у футері сайту', 'Дії'],
  historyDetails: ['Перед змінами', 'Після змін'],
  mainPageOrders: ['Дата', 'Вартість товару', 'Номер замовлення'],
  news: ['Аватар', 'Автор', 'Заголовок', 'Дії'],
  categories: ['Зображення', 'Категорія', 'Дії'],
  patterns: ['Фото', 'Назва', 'Матеріал', 'Доступний', 'Дії'],
  businessPages: ['№', 'Код', 'Заголовок', 'Дії'],
  questionsAnswers: ['№', 'Питання', 'Дії'],
  promoCodes: ['Промокод', 'Вартість', 'Статус', 'Термін дії', 'Дії'],
  materials: ['Назва', 'Застосування', 'Колір', 'Доступний', 'Дії'],
  materialsAbout: ['Матеріал', 'Заголовок', 'Текст', 'Дії'],
  materialColors: ['Фото', 'Повна назва', 'Коротка назва', 'Доступний', 'Дії'],
  products: [
    'Фото',
    'Назва',
    'Категорія',
    'Модель',
    'Гобелен',
    'Базова ціна(USD)',
    'Загальна ціна(USD)',
    'Рейтинг',
    'Кількість покупок',
    'Дії'
  ],
  categoryName: ['№', 'Мова', 'Назва', 'Дії'],
  categoryImages: ['№', 'Розмір', 'Посилання', 'Дії'],
  users: {
    userTab: [
      'Аватар',
      "Ім'я",
      'Мобільний номер',
      'Пошта',
      'Роль',
      'Статус',
      'Дії'
    ],
    adminTab: ['Аватар', "Ім'я", 'Пошта', 'Роль', 'Дії'],
    orderTab: [
      'Дата',
      'Номер замовлення',
      'Вартість товару',
      'Статус оплати',
      'Статус замовлення',
      'Дії'
    ],
    commentTab: [
      'Дата',
      'Текст',
      'Видимий',
      'Кількість відповідей',
      'Продукт',
      'Дії'
    ],
    commentReplyTab: [
      'Дата',
      'Текст',
      'Видимий',
      'Перевірене замовлення',
      'Дії'
    ]
  },
  contacts: ['Номер телефону', 'Email', 'Адреса', 'Дії'],
  orderProductTitles: [
    '№',
    'Назва',
    'Кількість',
    'Розмір',
    'Ціна',
    'Ціна зі знижкою',
    'Знижка',
    'Деталі'
  ],
  comments: {
    commentPageTitles: [
      'Дата',
      'Пошта',
      'Видимий',
      'Кількість відповідей',
      'Текст',
      'Дії'
    ],
    userPageTitles: ['Дата', 'Текст', 'Дії'],
    recentCommentsPageTitle: ['Дата', "Ім'я користувача", 'Текст']
  },
  replyComments: {
    replyCommentsPageTitles: ['Дата', 'Пошта', 'Видимий', 'Текст', 'Дії']
  },
  emailQuestions: [
    '#',
    'Дата',
    'Користувач',
    'Поштова скринька',
    'Запитання/Відповідь',
    'Статус',
    'Дії'
  ],
  sizes: {
    sizesPageTitles: ['Модель', 'Розмір', 'Доступно', 'Дії']
  },
  models: [
    'Фото',
    'Назва',
    'Категорія',
    'Доступна',
    'В конструкторі',
    'Пріорітет',
    'Дії'
  ],
  headers: ['Назва', 'Пріорітет', 'Посилання', 'Дії'],
  orders: [
    'Дата',
    'Номер замовлення',
    'Користувач',
    'Отримувач',
    'Вартість замовлення',
    'Статус оплати',
    'Статус замовлення',
    'Дії'
  ],
  homePageSlides: ['Порядок', 'Назва', 'Доступний', 'Дії'],
  actionLabel: 'Дії',
  patternConstructor: ['Колір', 'Назва', 'Матеріал', 'Доступний', 'Дії'],
  generalConstructor: [
    'Колір',
    'Назва',
    'Матеріал',
    'Доступний',
    'Фото',
    'Дії'
  ],
  pocket: ['Зображення', 'Назва', 'Додаткова ціна (USD)', 'Доступний', 'Дії'],
  back: [
    'Фото',
    'Назва',
    'Матеріал',
    'Колір',
    'Ціна (USD)',
    'Доступний',
    'Дії'
  ],
  bottom: [
    'Фото',
    'Назва',
    'Матеріал',
    'Колір',
    'Ціна (USD)',
    'Доступний',
    'Дії'
  ],
  constructorElementList: [
    'Вибрати',
    'Фото',
    'Назва',
    'Ціна (USD)',
    'Доступність'
  ],
  constructorList: ['Фото', 'Модель', 'Дії'],
  constructorPocketList: ['Фото', 'Назва', 'Позиція', 'Ціна (USD)', 'Дії'],
  basic: [
    'Фото',
    'Назва',
    'Матеріал',
    'Колір',
    'Ціна (USD)',
    'Доступна',
    'Дії'
  ],
  position: ['Назва', 'Доступний', 'Дії'],
  closure: ['Фото', 'Назва', 'Ціна (USD)', 'Доступний', 'Дії'],
  strap: [
    'Фото',
    'Назва',
    'Матеріал',
    'Колір',
    'Додаткова ціна (USD)',
    'Доступний',
    'Дії'
  ],
  certificates: [
    'Номер',
    'Сертифікат',
    'Вартість',
    'Статус',
    'Термін дії',
    'Дата використання',
    'Дії'
  ]
};

export default tableHeadRowTitles;
