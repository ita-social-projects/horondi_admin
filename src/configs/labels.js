import { mapToLanguages } from '../utils/map-languages';

const labels = {
  sort: 'Сортувати за',
  search: (param) => (!param ? 'Шукати' : `Шукати ${param}`),
  goToPage: 'Перейти на сторінку',
  user: {
    unknownAdmin: 'Невідомий адмін',
    guestUser: 'Гість'
  },
  news: {
    authorName: {
      ua: "Ім'я автора",
      en: 'Author name'
    },
    title: {
      ua: 'Заголовок',
      en: 'Title'
    },
    text: {
      ua: 'Текст',
      en: 'Text'
    },
    avatarText: 'Фото автора',
    mainImgText: 'Головне фото'
  },
  contacts: {
    schedule: {
      ua: 'Розклад',
      en: 'Schedule'
    },
    adress: {
      ua: 'Адреса',
      en: 'Address'
    }
  },
  model: {
    name: {
      ua: 'Назва',
      en: 'Name'
    },
    description: {
      ua: 'Опис',
      en: 'Description'
    },
    labelsEn: {
      modelImage: 'modelImage',
      name: 'name',
      description: 'description',
      availableForConstructor: 'availableForConstructor',
      categorySelect: 'category-select',
      category: 'category',
      priority: 'priority',
      tagsFilled: 'tags-filled',
      standard: 'standard',
      normal: 'normal',
      constructor: 'constructor',
      labelId: 'controlled-open-select-label',
      variantStandard: 'standard'
    },
    image: 'Фото моделі',
    availableCategory: 'Категорія',
    available: 'Доступний',
    show: 'Показати',
    defaultElement: 'За замовчуванням',
    availableForConstructor: 'Доступний для конструктора',
    constructorBasic: 'Основа',
    constructorPattern: 'Гобелен',
    constructorFrontPocket: 'Передня кишеня',
    constructorBottom: 'Низ',
    constructorPhoto: 'Фото для конструктора',
    baseConstructorElementPrice: 'Базова ціна',
    constructorMaterial: 'Матеріал',
    constructorColor: 'Колір',
    avatarText: 'Фото',
    priority: 'Пріорітет',
    chooseSizes: { title: 'Список розмірів', inputTitle: 'Оберіть розміри' },
    showEnable: 'Так',
    showDisable: 'Ні',
    availablePatternsForConstructor: 'Доступні патерни для контсруктора',
    constructorName: {
      ua: 'Назва елементу конструктора',
      en: 'Constructor element name'
    }
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
    material: 'Матеріал',
    available: 'Доступний',
    handmade: 'Зроблений вручну',
    avatarText: 'Фото',
    constructorImgText: 'Фото для конструктора',
    form: {
      name: mapToLanguages("І'мя", 'Name'),
      description: mapToLanguages('Опис', 'Description')
    },
    patternName: {
      ua: 'Назва гобелену',
      en: 'Pattern name'
    },
    patternDescription: {
      ua: 'Опис гобелену',
      en: 'Pattern description'
    },
    modelName: 'Назва моделі',
    additionalPrice: mapToLanguages(
      'Додаткова ціна (USD)',
      'Additional price (USD)'
    ),
    additionalPriceType: {
      absolutePrice: mapToLanguages(
        'Абсолютна ціна (USD)',
        'Absolute price (USD)'
      ),
      relativePrice: mapToLanguages('Відносна ціна (%)', 'Relative price (%)')
    }
  },
  basics: {
    image: 'Фото основи',
    material: 'Матеріал',
    available: 'Доступна',
    customizable: 'для конструктора',
    avatarText: 'Фото',
    enterPrice: 'Додаткова ціна (USD):',
    additionalPriceLabel: 'Введіть додаткову ціну',
    form: {
      name: mapToLanguages("І'мя", 'Name')
    },
    basicName: {
      ua: 'Назва основи',
      en: 'Basic name'
    },
    materialLabels: [
      {
        label: 'Матеріал для основи ',
        name: 'material',
        required: false,
        validation: 'string'
      },
      {
        label: 'Колір основи',
        name: 'color',
        required: false,
        validation: 'string'
      }
    ]
  },
  back: {
    image: 'Фото спинки',
    material: 'Матеріал',
    available: 'Доступний',
    customizable: 'для конструктора',
    avatarText: 'Фото',
    enterPrice: 'Додаткова ціна (USD):',
    additionalPriceLabel: 'Введіть додаткову ціну (USD)',
    additionalPriceType: {
      absolutePrice: mapToLanguages(
        'Абсолютна ціна (USD)',
        'Absolute price (USD)'
      ),
      relativePrice: mapToLanguages('Відносна ціна (%)', 'Relative price (%)')
    },
    additionalPrice: 'Введіть додаткову ціну',
    form: {
      name: mapToLanguages("І'мя", 'Name')
    },
    backName: {
      ua: 'Назва спинки',
      en: 'Back name'
    },
    materialLabels: [
      {
        label: 'Матеріал для спинки ',
        name: 'material',
        required: false,
        validation: 'string'
      },
      {
        label: 'Колір спинки',
        name: 'color',
        required: false,
        validation: 'string'
      }
    ]
  },
  bottom: {
    image: 'Фото низу',
    material: 'Матеріал',
    available: 'Доступний',
    avatarText: 'Фото',
    enterPrice: 'Додаткова ціна (USD):',
    additionalPriceLabel: 'Введіть додаткову ціну',
    form: {
      name: mapToLanguages("І'мя", 'Name')
    },
    bottomName: {
      ua: 'Назва низу',
      en: 'Bottom name'
    },
    materialLabels: [
      {
        label: 'Матеріал для низу',
        name: 'material',
        required: false,
        validation: 'string'
      },
      {
        label: 'Колір низу',
        name: 'color',
        required: false,
        validation: 'string'
      }
    ]
  },
  material: {
    image: mapToLanguages('Фото матеріалу', 'Material photo'),
    purpose: mapToLanguages('Застосування', 'Purpose'),
    available: mapToLanguages('Доступний', 'Available'),
    name: { ua: 'Назва матеріалу', en: 'Material name' },
    description: { ua: 'Опис матеріалу', en: 'Material description' },
    additionalPrice: mapToLanguages(
      'Додаткова ціна (USD)',
      'Additional price (USD)'
    ),
    additionalPriceType: {
      absolutePrice: mapToLanguages(
        'Абсолютна ціна (USD)',
        'Absolute price (USD)'
      ),
      relativePrice: mapToLanguages('Відносна ціна (%)', 'Relative price (%)')
    }
  },
  color: {
    name: 'Назва кольору',
    simpleName: 'Проста назва кольору',
    colorHex: '# Колір',
    mainLabel: 'Колір'
  },
  comment: {
    text: 'Текст коментаря',
    show: 'Видимий',
    hidden: 'Прихований',
    yes: 'Так',
    no: 'Ні',
    productInfo: 'Інформація про продукт'
  },
  replyComment: {
    commentInfo: 'Інформіція про коментар',
    text: 'Текст відповіді',
    show: 'Видимий',
    hidden: 'Прихований',
    yes: 'Так',
    no: 'Ні'
  },
  businessPageLabel: [
    {
      label: { ua: 'Заголовок', en: 'Title' },
      name: 'title',
      required: true
    },
    {
      label: { ua: 'Текст', en: 'Text' },
      name: 'text',
      isEditor: true
    }
  ],
  product: {
    additionalPriceType: {
      absolutePrice: mapToLanguages(
        'Абсолютна ціна (USD)',
        'Absolute price (USD)'
      ),
      relativePrice: mapToLanguages('Відносна ціна (%)', 'Relative price (%)')
    },
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
      'Оберіть матеріали та кольори до них',
      'Завантажте фото для продукту',
      'Підтвердження створення продукту'
    ],
    infoLabels: [
      {
        label: { ua: 'Назва', en: 'Name' },
        name: 'name',
        required: true
      },
      {
        label: { ua: 'Опис', en: 'Description' },
        name: 'description',
        isEditor: true
      }
    ],
    materialLabels: [
      {
        label: 'Основний матеріал',
        name: 'mainMaterial',
        required: true,
        validation: 'string'
      },
      {
        label: 'Колір основного матеріалу',
        name: 'mainColor',
        required: true,
        validation: 'string'
      },
      {
        label: 'Нижній матеріал',
        name: 'bottomMaterial',
        required: false,
        validation: 'string'
      },
      {
        label: 'Колір нижнього матеріалу',
        name: 'bottomColor',
        required: false,
        validation: 'string'
      },
      {
        label: 'Внутрішній матеріал',
        name: 'innerMaterial',
        required: false,
        validation: 'string'
      },
      {
        label: 'Колір внутрішнього матеріалу',
        name: 'innerColor',
        required: false,
        validation: 'string'
      }
    ],
    selectsLabels: [
      {
        label: 'Категорія ',
        name: 'category',
        type: 'select',
        required: true,
        multiple: false,
        validation: 'string'
      },
      {
        label: 'Модель ',
        name: 'model',
        type: 'select',
        required: true,
        multiple: false,
        validation: 'string'
      },
      {
        label: 'Розміри ',
        name: 'sizes',
        type: 'select',
        required: true,
        multiple: true,
        validation: 'string'
      },
      {
        label: 'Гобелен ',
        name: 'pattern',
        type: 'select',
        required: true,
        multiple: false,
        validation: 'string'
      },
      {
        label: 'Замочок',
        name: 'closure',
        type: 'select',
        required: true,
        multiple: false,
        validation: 'string'
      },
      {
        label: 'Довжина лямок(см)',
        name: 'strapLengthInCm',
        type: 'number',
        required: true,
        multiple: false,
        validation: 'number'
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
      label: 'Ціна (USD) ',
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
    house: 'Будинок',
    flat: 'Квартира'
  },
  sizeValues: {
    heightInCm: 'Висота (см.)',
    widthInCm: 'Ширина (см.)',
    depthInCm: 'Глибина (см.)',
    volumeInLiters: "Об'єм (л.)",
    weightInKg: 'Вага (кг.)'
  },
  emailQuestionsLabels: {
    questionFrom: 'Запитання від ',
    textFieldPlaceholder: 'Введіть вашу відповідь',
    rowPlaceholder: {
      answer: 'Відповідь',
      question: 'Запитання'
    },
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
    answer: 'Відповісти',
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
    novaPost: 'Нова пошта',
    ukrPost: 'Укрпошта',
    selfPickup: 'Самовивіз',
    novaPostCourier: "Кур'єр нової пошти",
    ukrPostCourier: "Кур'єр укрпошти"
  },
  generalLabels: {
    deliveryStatusLabel: 'Статус замовлення:',
    paymentMethodLabel: 'Метод оплати:',
    paymentStatusLabel: 'Статус оплати:',
    isPaidLabel: 'Оплачено:',
    cancellationReasonLabel: 'Причина скасування',
    creationDateLabel: 'Дата створення:',
    updateDateLabel: 'Дата оновлення:',
    userCommentLabel: 'Коментар користувача'
  },
  productsLabels: {
    notListed: 'Не вказано',
    additionsLabel: 'Додатки',
    colorsLabel: 'Кольори',
    sizeLabel: 'Розмір'
  },
  orders: {
    select: [
      { label: 'Створено', value: 'CREATED' },
      { label: 'Підтвердженно', value: 'CONFIRMED' },
      { label: 'Виготовлено', value: 'PRODUCED' },
      { label: 'Скасовано', value: 'CANCELLED' },
      { label: 'Повернення коштів', value: 'REFUNDED' },
      { label: 'Відправлено', value: 'SENT' },
      { label: 'Доставлено', value: 'DELIVERED' }
    ]
  },
  comments: {
    select: [
      { label: 'Коментар', value: 'COMMENT' },
      { label: 'Відповідь', value: 'REPLY_COMMENT' }
    ]
  },
  homePageSlide: {
    image: 'Фото слайду',
    title: { ua: 'Заголовок слайду', en: 'Slider title' },
    show: 'Доступний',
    description: { ua: 'Опис слайду', en: 'Slide description' },
    link: 'Відносне посилання для переходу (без домену)'
  },
  lableTitle: {
    ua: 'Заголовок ua',
    en: 'Заголовок en'
  },

  sizePageLabels: {
    sizesHeader: 'sizes-header',
    sizesTable: 'sizesTable'
  },

  sizeInputData: {
    sizeMetricData: [
      'heightInCm',
      'widthInCm',
      'depthInCm',
      'volumeInLiters',
      'weightInKg'
    ],
    sizePricesData: ['simpleNameUa', 'simpleNameEn']
  },

  sizeLabels: {
    additionalPrice: mapToLanguages(
      'Додаткова ціна (USD)',
      'Additional price (USD)'
    ),
    additionalPriceType: {
      absolutePrice: mapToLanguages(
        'Абсолютна ціна (USD)',
        'Absolute price (USD)'
      ),
      relativePrice: mapToLanguages('Відносна ціна (%)', 'Relative price (%)')
    },
    ua: {
      heightInCm: 'Висота',
      widthInCm: 'Ширина',
      depthInCm: 'Глибина',
      volumeInLiters: "Об'єм (літри)",
      weightInKg: 'Вага',
      additionalPrice: 'Додаткова ціна (USD)',
      modelName: 'Назва моделі',
      name: "Ім'я",
      available: 'Доступний',
      additionalPriceType: {
        absolutePrice: 'Абсолютна ціна (USD)',
        relativePrice: 'Відносна ціна (%)'
      }
    },
    en: {
      heightInCm: 'heightInCm',
      widthInCm: 'widthInCm',
      depthInCm: 'depthInCm',
      volumeInLiters: 'volumeInLiters',
      weightInKg: 'weightInKg',
      additionalPrice: 'additionalPrice (USD)',
      modelName: 'modelId',
      name: 'name',
      available: 'available',
      additionalPriceType: {
        absolutePrice: 'Absolute price (USD)',
        relativePrice: 'Relative price (%)'
      }
    }
  },
  pocketsPageLabel: {
    pocketsHeader: 'pockets-header',
    pocketsTable: 'sidePocketsTable',
    pocketsName: {
      ua: 'Назва кишені',
      en: 'Pocket name'
    },
    enterPrice: 'Додаткова ціна (USD):',
    additionalPrice: 'Введіть додаткову ціну',
    avaliable: 'Додати до обмежень',
    avatarText: 'Фото',
    labelsRestriction: 'restriction',
    labelIdAut: 'labelIdAut',
    normal: 'normal',
    choosePositions: { title: 'Список позицій', inputTitle: 'Оберіть позиції' }
  },
  closuresPageLabel: {
    closuresHeader: 'closures-header',
    closuresTable: 'sideClosuresTable',
    closuresName: {
      ua: 'Назва замочка',
      en: 'Closure name'
    },
    enterPrice: 'Додаткова ціна (USD):',
    // additionalPrice: 'Введіть додаткову ціну',
    available: 'Доступний',
    avatarText: 'Фото',
    additionalPrice: mapToLanguages(
      'Додаткова ціна (USD)',
      'Additional price (USD)'
    ),
    additionalPriceType: {
      absolutePrice: mapToLanguages(
        'Абсолютна ціна (USD)',
        'Absolute price (USD)'
      ),
      relativePrice: mapToLanguages('Відносна ціна (%)', 'Relative price (%)')
    }
  },
  positionPageLabel: {
    positionHeader: 'position-header',
    positionTable: 'positionTable',
    available: 'Доступно',
    positionName: {
      ua: 'Позиція',
      en: 'Position'
    }
  },
  basicsPageLabel: {
    basicsHeader: 'basics-header',
    basicsTable: 'sideBasicsTable',
    basicsName: {
      ua: 'Назва основи',
      en: 'Basics name'
    },
    available: 'Доступний',
    avatarText: 'Фото',
    additionalPriceType: {
      absolutePrice: mapToLanguages(
        'Абсолютна ціна (USD)',
        'Absolute price (USD)'
      ),
      relativePrice: mapToLanguages('Відносна ціна (%)', 'Relative price (%)')
    },
    enterPrice: 'Додаткова ціна (USD):',
    additionalPrice: 'Введіть додаткову ціну'
  },
  strapsPageLabel: {
    strapsHeader: 'straps-header',
    strapsTable: 'sideStrapsTable',
    strapsName: {
      ua: 'Назва ремінця',
      en: 'Strap name'
    },
    enterPrice: 'Додаткова ціна (USD):',
    additionalPrice: 'Введіть додаткову ціну',
    additionalPriceType: {
      absolutePrice: mapToLanguages(
        'Абсолютна ціна (USD)',
        'Absolute price (USD)'
      ),
      relativePrice: mapToLanguages('Відносна ціна (%)', 'Relative price (%)')
    },
    available: 'Доступний',
    avatarText: 'Фото',
    chooseColor: { title: 'Колір', inputTitle: 'Оберіть колір' }
  }
};
export default labels;
