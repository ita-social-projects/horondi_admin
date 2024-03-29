const titles = {
  mainPageTitles: {
    mainTitle: 'Домашня сторінка',
    commentsTitle: 'Останні коментарі',
    ordersTitle: 'Останні замовлення',
    changesTitle: 'Останні зміни'
  },
  aboutUsTitles: {
    mainTitle: 'Інформація Про Нас',
    mainTitleAdd: 'Додати Про Нас'
  },
  historyTitles: {
    tableTitles: ['Поле', 'До', 'Після '],
    mainTitle: 'Останні зміни',
    detailsTitleNumber: (number) => `Деталі зміни № ${number}`,
    userInfo: 'Інформація про користувача',
    itemsInfo: "Інформація про об'єкт",
    id: 'Ідентифікатор:',
    email: 'Електронна пошта:',
    name: `Ім'я:`,
    role: 'Роль:',
    changesTitle: 'Інформація про зміни',
    itemName: 'Назва:',
    itemType: 'Тип:',
    action: 'Дія:'
  },
  categoriesTitles: {
    deleteTitle: 'Видалити категорію'
  },
  patternTitles: {
    mainPageTitle: 'Інформація про гобелени',
    createPageTitle: 'Створити гобелен',
    convertationTitle: 'Відповідна ціна в UAH',
    modelTitle: 'Модель'
  },
  constructorMainPageTitles: {
    back: 'Інформація про спинки',
    bottom: 'Інформація про низи',
    closure: 'Інформація про защіпки',
    basic: 'Інформація про основи',
    strap: 'Інформація про ремінці',
    pocket: 'Інформація про кишені',
    position: 'Інформація про розміщення'
  },
  commentTitles: {
    mainPageTitle: 'Інформація про коментарі'
  },
  replyCommentTitles: {
    mainPageTitle: 'Інформація про відповіді'
  },
  productPageTitles: {
    mainPageTitle: 'Інформація про продукти'
  },
  categoryPageTitles: {
    mainPageTitle: 'Інформація про категорії',
    createPageTitle: 'Додати нову категорію'
  },
  contactsPageTitles: {
    mainPageTitle: 'Інформація про контакти'
  },
  usersPageTitles: {
    mainPageTitle: 'Інформація про користувачів'
  },
  newsPageTitles: {
    mainPageTitle: 'Інформація про новини'
  },
  homePageTitles: {
    mainPageTitle: 'Головна сторінка',
    ourLooksImages: 'Стиль Горонді'
  },
  emailQuestionsTitles: {
    mainPageTitle: 'Запитання покупців',
    detailPageTitle: 'Деталі запитання'
  },
  modelPageTitles: {
    mainPageTitle: 'Інформація про моделі'
  },
  headerPageTitles: {
    mainPageTitle: 'Інформація про посилання',
    createPageTitle: 'Створити посилання'
  },
  sizesTitles: {
    mainPageTitle: 'Iнформація про розміри',
    selectTitle: 'Розмір',
    modelTitle: 'Модель',
    sizeEdit: 'Редагування розміру',
    sizeAdd: 'Додавання розміру',
    convertationTitle: 'Відповідна ціна в UAH'
  },
  materialTitles: {
    mainPageTitle: 'Iнформація про матеріали',
    createPageTitle: 'Створити матеріал',
    convertationTitle: 'Відповідна ціна в UAH'
  },
  colorTitles: {
    createColorTitle: 'Створити колір',
    alreadyUse: 'Колір вже використовується!'
  },
  businessPageTitles: {
    mainPageTitle: 'Інформація про бізнес сторінки',
    addBusinessPageTitle: 'Додати нову бізнес сторінку',
    editBusinessPageTitle: 'Редагувати бізнес сторінку'
  },
  questionsAnswersTitles: {
    mainQuestionsAnswersTitle: 'Питання та відповіді',
    addQuestionsAnswersTitle: 'Додати питання та відповідь'
  },
  materialColorPaletteTitle: {
    mainPageTitle: 'Iнформація про палітру кольорів'
  },
  statisticTitles: {
    mainPageTitle: 'Статистика',
    dateSortTitle: 'Сортувати за датою',
    statuses: {
      CREATED: 'Створені',
      DELIVERED: 'Доставлені',
      CONFIRMED: 'Підтверджені',
      CANCELLED: 'Скасовані',
      REFUNDED: 'Повернені',
      PRODUCED: 'Виготовлені',
      SENT: 'Відправлені'
    }
  },
  orderTitles: {
    mainPageTitle: 'Інформація про замовлення',
    filterBy: 'Фільтрувати',
    ORDER_NOT_FOUND: 'Замовлення відсутні',
    orders: 'замовлень'
  },
  homePageSliderTitle: {
    mainPageTitle: 'Слайди на головній сторінці',
    slideOrderTitle: 'Порядок слайдів',
    slideTitle: 'Заголовок слайду не вибрано',
    slideDescription: 'Опис слайду не вибрано',
    preview: 'Попередній перегляд'
  },
  productTitles: {
    filters: 'Фільтри',
    deleteFilter: 'Очистити фільтр',
    mainPageTitle: 'Інформація про продукти',
    convertationTitle: 'Відповідна ціна в UAH',
    modelTitle: 'Модель'
  },
  promoPageTitles: {
    mainPageTitle: 'Інформація про промокоди'
  },
  constructorListPageTitles: {
    mainPageTitle: 'Список конструкторів'
  },
  constructorModelTitles: {
    mainPageTitle: 'Опції конструктора'
  },
  certificatesTitles: {
    mainPageTitle: 'Створити Подарунковий Сертифікат:',
    validity: 'Термін дії:',
    validFrom: 'Дійсний від',
    validUntil: 'Дійсний до',
    cost: 'Вартість:'
  },
  certificatesValueTitles: [
    { name: '500 грн', value: 500 },
    { name: '1000 грн', value: 1000 },
    { name: '1500 грн', value: 1500 }
  ],
  certificatesPageTitles: {
    mainPageTitle: 'Інформація про сертифікати',
    deleteCertificateTitle: 'Видалити сертифікат',
    updateCertificateTitle: 'Змінити статус сертифікату'
  },
  registerUserTitles: {
    role: 'Роль',
    email: 'Пошта',
    code: 'Код'
  }
};

export default titles;
