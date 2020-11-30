const labels = {
  sort: 'Сортувати за',
  search: 'Шукати',
  user: {
    unknownAdmin: 'Невідомий адмін'
  },
  news: {
    authorsName: [
      { value: "Ім'я автора", lang: 'ua' },
      { value: "Author's name", lang: 'en' }
    ],
    title: [
      { value: 'Заголовок', lang: 'ua' },
      { value: 'Title', lang: 'en' }
    ],
    text: [
      { value: 'Текст', lang: 'ua' },
      { value: 'Text', lang: 'en' }
    ]
  },
  model: {
    name: 'Назва',
    description: 'Опис',
    image: 'Фото моделі',
    category: 'Категорія',
    available: 'Доступний',
    show: 'Показати',
    avatarText: 'Фото',
    priority: 'Пріорітет',
    showEnable: 'Так',
    showDisable: 'Ні'
  },
  categories: {
    switchCategory: "Категорія, на яку замінити пов'язані товари"
  },
  header: {
    name: [
      { value: "Ім'я", lang: 'ua' },
      { value: 'Name', lang: 'en' }
    ],
    link: 'Посилання',
    priority: 'Пріорітет'
  },
  pattern: {
    image: 'Фото гобелена',
    material: 'Код матеріалу',
    available: 'Доступний',
    handmade: 'Зроблений вручну',
    avatarText: 'Фото',
    form: {
      name: [
        { value: 'Назва', lang: 'ua' },
        { value: 'Name', lang: 'en' }
      ],
      description: [
        { value: 'Опис', lang: 'ua' },
        { value: 'Description', lang: 'en' }
      ]
    }
  },
  material: {
    image: [
      { value: 'Фото матеріалу', lang: 'ua' },
      { value: 'Material photo', lang: 'eu' }
    ],
    purpose: [
      { value: 'Застосування', lang: 'ua' },
      { value: 'Purpose', lang: 'eu' }
    ],
    available: [
      { value: 'Доступний', lang: 'ua' },
      { value: 'Available', lang: 'en' }
    ],
    name: [
      { value: 'Назва матеріалу', lang: 'ua' },
      { value: 'Material name', lang: 'en' }
    ],
    description: [
      { value: 'Опис матеріалу', lang: 'ua' },
      { value: 'Material description', lang: 'eu' }
    ],
    additionalPrice: [
      { value: 'Додаткова ціна', lang: 'ua' },
      { value: 'Additional price', lang: 'eu' }
    ]
  },
  colors: {
    image: 'Фото кольору',
    name: 'Назва кольору',
    simpleName: 'Проста назва кольору',
    code: 'Код кольору',
    available: 'Доступний'
  },
  businessPage: [
    {
      label: [
        { value: 'Заголовок', lang: 'ua' },
        { value: 'Title', lang: 'en' }
      ],
      errorLabel: [
        { value: 'Введіть заголовок', lang: 'ua' },
        { value: 'Pass title', lang: 'en' }
      ]
    },
    {
      label: [
        { value: 'Текст', lang: 'ua' },
        { value: 'Text', lang: 'en' }
      ],
      errorLabel: [
        { value: 'Введіть текст для сторінки', lang: 'ua' },
        { value: 'Pass text for the page', lang: 'en' }
      ]
    }
  ],
  product: {
    sortBySelectOptions: [
      { label: 'популярністю', value: 'popularity' },
      { label: 'від дорогих до дешевих', value: 'sortDesc' },
      { label: 'від дешевих до дорогих', value: 'sortAsc' },
      { label: 'рейтингом', value: 'rate' }
    ],
    stepsLabels: [
      'Введіть інформацію про продукт',
      'Оберіть категорію, підкатегорію, модель, колір, гобелен та ціну продукту',
      'Вкажіть ціну продукту',
      'Оберіть опційні параметри',
      'Завантажте фото для продукту',
      'Підтвердження створення продукту'
    ],
    infoLabels: [
      {
        label: [
          { value: 'Назва', lang: 'ua' },
          { value: 'Name', lang: 'en' }
        ],
        name: 'name',
        required: true
      },
      {
        label: [
          { value: 'Основний матеріал', lang: 'ua' },
          { value: 'Primary material', lang: 'en' }
        ],
        name: 'mainMaterial',
        required: true
      },
      {
        label: [
          { value: 'Внутрішній матеріал', lang: 'ua' },
          { value: 'Inner material', lang: 'en' }
        ],
        name: 'innerMaterial',
        required: false
      },
      {
        label: [
          { value: 'Замок', lang: 'ua' },
          { value: 'Closure', lang: 'en' }
        ],
        name: 'closure',
        required: false
      },
      {
        label: [
          { value: 'Довжина лямок(см)', lang: 'ua' },
          { value: 'Strap length (cm)', lang: 'en' }
        ],
        name: 'strapLengthInCm',
        required: false
      },
      {
        label: [
          { value: 'Опис', lang: 'ua' },
          { value: 'Description', lang: 'en' }
        ],
        name: 'description',
        required: false
      }
    ],
    selectsLabels: [
      {
        label: 'Категорія ',
        name: 'category',
        type: 'select',
        required: true
      },
      {
        label: 'Модель ',
        name: 'model',
        type: 'select',
        required: true
      },
      {
        label: 'Колір ',
        name: 'colors',
        type: 'select',
        required: true
      },
      {
        label: 'Гобелен ',
        name: 'pattern',
        type: 'select',
        required: true
      }
    ],
    optionsLabels: [
      { label: 'Розміри', name: 'sizes' },
      { label: 'Нижні матеріали', name: 'bottomMaterials' }
    ],
    sizeCardsLabels: [
      { label: 'Розмір', name: 'name' },
      { label: `Об'єм(л)`, name: 'volumeInLiters' },
      { label: 'Ширина(см)', name: 'widthInCm' },
      { label: 'Висота(см)', name: 'heightInCm' },
      { label: 'Глибина(см)', name: 'depthInCm' }
    ],
    materialsLabels: [{ label: `Назва`, name: 'name' }],
    optionsValues: {
      sizes: [],
      bottomMaterials: [],
      additions: false
    },
    priceLabel: {
      label: 'Ціна(USD) ',
      name: 'basePrice'
    }
  },
  orderProduct: {
    category: 'Категорія',
    subcategory: 'Підкатегорія',
    model: 'Модель',
    name: 'Назва',
    pattern: 'Гобелен',
    closure: 'Матеріал замку',
    bottomMaterial: 'Матеріал дна',
    bottomColor: 'Колір дна',
    actualPrice: 'Ціна'
  },
  orderRecipient: {
    firstName: "Ім'я",
    lastName: 'Прізвище',
    patronymicName: 'По-батькові',
    email: 'e-mail',
    phoneNumber: 'Номер телефону',
    commentary: 'Коментар'
  },
  deliveryDetails: {
    country: 'Країна',
    region: 'Область',
    city: 'Місто',
    zipcode: 'Поштовий індекс',
    street: 'Вулиця',
    buildingNumber: 'Номер будинку',
    appartment: 'Номер квартири'
  },
  sizeValues: {
    heightInCm: 'Висота (см.)',
    widthInCm: 'Ширина (см.)',
    depthInCm: 'Глибина (см.)',
    volumeInLiters: "Об'єм (л.)",
    weightInKg: 'Вага (кг.)'
  },
  emailQuestionsLabels: {
    en: {
      ALL: 'ALL',
      PENDING: 'PENDING',
      SPAM: 'SPAM',
      ANSWERED: 'ANSWERED'
    },
    ua: {
      ALL: 'Всі',
      PENDING: 'Очікує відповіді',
      SPAM: 'Спам',
      ANSWERED: 'Відповідь надано'
    },
    placeholder: 'Відповідь ...'
  },
  doughnut: {
    select: [
      { label: 'Популярні категорії за весь час', value: 'categories' },
      { label: 'Останні замовлення', value: 'orders' }
    ],
    dateMenuOptions: [
      { label: 'За 7 Днів', value: 7 },
      { label: 'За 14 Днів', value: 14 },
      { label: 'За місяць', value: 30 },
      { label: 'За 3 місяці', value: 90 },
      { label: 'За рік', value: 365 }
    ]
  },
  bar: {
    select: [
      { label: 'Популярні продукти за весь час', value: 'products' },
      { label: 'Виконані замовлення', value: 'orders' },
      { label: 'Останні зареєстровані користувачі', value: 'users' }
    ],
    descriptions: {
      users: 'Цей день',
      orders: 'Цей день',
      products: 'Кількість покупок'
    },
    message: {
      users: 'Кількість користувачів за цей час: ',
      orders: 'Кількість замовлень за цей час: ',
      products: 'Кількість продуктів за цей час: '
    }
  },
  orderTabs: {
    general: 'Загальне',
    receiver: 'Отримувач',
    products: 'Продукти',
    delivery: 'Доставка'
  },
  deliveryLabels: {
    deliveryMethodLabel: 'Спосіб доставки',
    byCourierLabel: "Доставка кур'єром:",
    invoiceNumberLabel: 'Номер накладної',
    warehouseNumberLabel: 'Номер відділення: ',
    sentAtLabel: 'Відправлено о:',
    deliveryCostLabel: 'Вартість доставки'
  },
  generalLabels: {
    deliveryStatusLabel: 'Статус замовлення:',
    paymentMethodLabel: 'Метод оплати:',
    isPaidLabel: 'Оплачено:',
    cancellationReasonLabel: 'Причина скасування',
    creationDateLabel: 'Дата створення:',
    updateDateLabel: 'Дата оновлення:',
    adminCommentLabel: 'Залишити коментар'
  },
  productsLabels: {
    notListed: 'Не вказано',
    additionsLabel: 'Додатки',
    colorsLabel: 'Кольори',
    sizeLabel: 'Розмір'
  },
  orders: {
    select: [
      { label: 'Створені', value: 'CREATED' },
      { label: 'Виконані', value: 'CONFIRMED' },
      { label: 'Оброблені', value: 'PRODUCED' },
      { label: 'Скасовані', value: 'CANCELLED' },
      { label: 'Повернені', value: 'REFUNDED' },
      { label: 'Надіслані', value: 'SENT' },
      { label: 'Доставлені', value: 'DELIVERED' },
      { label: 'Всі', value: 'All' }
    ]
  },
  homePageSlide: {
    image: 'Фото слайду',
    title: [
      { value: 'Заголовок слайду', lang: 'ua' },
      { value: 'Slider title', lang: 'en' }
    ],
    show: 'Доступний',
    description: 'Опис слайду',
    link: 'Посилання для переходу'
  }
};
export default labels;
