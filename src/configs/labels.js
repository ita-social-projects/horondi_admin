const labels = {
  sort: 'Сортувати за',
  search: 'Шукати',
  user: {
    unknownAdmin: 'Невідомий адмін'
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
  pattern: {
    image: 'Фото гобелена',
    material: 'Код матеріалу',
    available: 'Доступний',
    handmade: 'Зроблений вручну',
    avatarText: 'Фото'
  },
  material: {
    image: 'Фото матеріалу',
    purpose: 'Застосування',
    available: 'Доступний',
    name: 'Назва матеріалу',
    description: 'Опис матеріалу',
    additionalPrice: 'Додаткова ціна'
  },
  colors: {
    image: 'Фото кольору',
    name: 'Назва кольору',
    simpleName: 'Проста назва кольору',
    code: 'Код кольору',
    available: 'Доступний'
  },
  product: {
    sortBySelectOptions: [
      {
        label: 'популярністю',
        value: 'popularity'
      },
      {
        label: 'від дорогих до дешевих',
        value: 'sortDesc'
      },
      {
        label: 'від дешевих до дорогих',
        value: 'sortAsc'
      },
      {
        label: 'рейтингом',
        value: 'rate'
      }
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
      { label: 'Назва', name: 'name', required: true },
      {
        label: 'Основний матеріал',
        name: 'mainMaterial',
        required: true
      },
      {
        label: 'Внутрішній матеріал',
        name: 'innerMaterial',
        required: false
      },
      { label: 'Замок', name: 'closure', required: false },
      {
        label: 'Довжина лямок(см)',
        name: 'strapLengthInCm',
        required: false
      },
      { label: 'Опис', name: 'description', required: false }
    ],
    selectsLabels: [
      {
        label: 'Категорія ',
        name: 'category',
        type: 'select',
        required: true
      },
      {
        label: 'Підкатегорія ',
        name: 'subcategory',
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
    category:'Категорія',
    subcategory:'Підкатегорія',
    model:'Модель',
    name:'Назва',
    pattern:'Гобелен',
    closure:'Матеріал замку',
    bottomMaterial:'Матеріал дна',
    bottomColor:'Колір дна',
    actualPrice:'Ціна',
  },
  orderRecipient: {
    firstName: 'Ім\'я',
    lastName: 'Прізвище',
    patronymicName: 'По-батькові',
    email:'e-mail',
    phoneNumber:'Номер телефону'
  },
  deliveryDetails: {
    country:'Країна',
    region:'Область',
    city:'Місто',
    zipcode:'Поштовий індекс',
    street:'Вулиця',
    buildingNumber:'Номер будинку',
    appartment:'Номер квартири',
  },
  sizeValues: {
    heightInCm: 'Висота (см.)',
    widthInCm: 'Ширина (см.)',
    depthInCm: 'Глибина (см.)',
    volumeInLiters: 'Об\'єм (л.)',
    weightInKg: 'Вага (кг.)',
    emailQuestionsLabels: {
      en: {
        PENDING: 'PENDING',
        SPAM: 'SPAM',
        ANSWERED: 'ANSWERED'
      },
      ua: {
        PENDING: 'Очікує відповіді',
        SPAM: 'Спам',
        ANSWERED: 'Відповідь надано'
      },
      placeholder: 'Відповідь ...'
    },
    doughnut: {
      select: [
        { label: 'Популярні категорії', value: 'categories' },
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
        { label: 'Популярні продукти', value: 'products' },
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
    }
  }
};
export default labels;
