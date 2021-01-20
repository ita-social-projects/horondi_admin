import { mapToLanguages } from '../utils/map-languages';

const labels = {
  sort: 'Сортувати за',
  search: 'Шукати',
  goToPage: 'Перейти на сторінку',
  user: {
    unknownAdmin: 'Невідомий адмін',
    guestUser: 'Гість'
  },
  news: {
    authorsName: "Ім'я автора",
    title: 'Заголовок',
    text: 'Текст'
  },
  model: {
    name: mapToLanguages('Назва', 'Name'),
    description: mapToLanguages('Опис', 'Description'),
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
    switchCategory: "Категорія, на яку замінити пов'язані товари",
    categoryCode: 'Код категорії',
    categoryName: {
      ua: 'Назва категорії',
      en: 'Category name'
    }
  },
  header: {
    name: mapToLanguages("І'мя", 'Name'),
    link: 'Посилання',
    priority: 'Пріорітет'
  },
  pattern: {
    image: 'Фото гобелена',
    material: 'Код матеріалу',
    available: 'Доступний',
    handmade: 'Зроблений вручну',
    avatarText: 'Фото',
    patternName: {
      ua: 'Назва гобелену',
      en: 'Pattern name'
    },
    patternDescription: {
      ua: 'Опис гобелену',
      en: 'Pattern description'
    }
  },
  material: {
    image: mapToLanguages('Фото матеріалу', 'Material photo'),
    purpose: mapToLanguages('Застосування', 'Purpose'),
    available: mapToLanguages('Доступний', 'Available'),
    name: mapToLanguages('Назва матеріалу', 'Material name'),
    description: mapToLanguages('Опис матеріалу', 'Material description'),
    additionalPrice: mapToLanguages('Додаткова ціна', 'Additional price')
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
      label: mapToLanguages('Заголовок', 'Title'),
      errorLabel: mapToLanguages('Введіть заголовок', 'Pass title')
    },
    {
      label: mapToLanguages('Текст', 'Text'),
      errorLabel: mapToLanguages(
        'Введіть текст для сторінки',
        'Pass text for the page'
      )
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
        label: mapToLanguages('Назва', 'Name'),
        name: 'name',
        required: true
      },
      {
        label: mapToLanguages('Основний матеріал', 'Primary material'),
        name: 'mainMaterial',
        required: true
      },
      {
        label: mapToLanguages('Внутрішній матеріал', 'Inner material'),
        name: 'innerMaterial',
        required: false
      },
      {
        label: mapToLanguages('Замок', 'Closure'),
        name: 'closure',
        required: false
      },
      {
        label: mapToLanguages('Довжина лямок(см)', 'Strap length (cm)'),
        name: 'strapLengthInCm',
        required: false
      },
      {
        label: mapToLanguages('Опис', 'Description'),
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

    days: {
      7: 'byDay',
      14: 'byDay',
      30: 'byThreeDays',
      90: 'byWeek',
      365: 'byMonth'
    },
    descriptions: {
      users: {
        byDay: 'Цей день',
        byThreeDays: 'Ці дні',
        byWeek: 'Цей тиждень',
        byMonth: 'Цей місяць'
      },
      orders: {
        byDay: 'Цей день',
        byThreeDays: 'Ці дні',
        byWeek: 'Цей тиждень',
        byMonth: 'Цей місяць'
      },
      products: {
        byDay: 'Кількість покупок',
        byThreeDays: 'Кількість покупок',
        byWeek: 'Кількість покупок',
        byMonth: 'Кількість покупок'
      }
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
    title: mapToLanguages('Заголовок слайду', 'Slider title'),
    show: 'Доступний',
    description: 'Опис слайду',
    link: 'Посилання для переходу'
  },
  lableTitle: {
    ua: 'Заголовок ua',
    en: 'Заголовок en'
  }
};
export default labels;
