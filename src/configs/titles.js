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
    mainTitle: 'Останні зміни',
    detailsTitle: 'Деталі зміни',
    detailsTitleNumber: (number) => `Деталі зміни № ${number}`,
    userInfo: 'Інформація про користувача',
    id: 'Ідентифікатор:',
    email: 'Електронна пошта:',
    name: `Ім'я:`,
    role: 'Роль:',
    changesTitle: 'Інформація про зміни',
    subject: 'Об’єкт дії',
    before: 'До зміни',
    after: 'Після зміни',
    noChanges: 'N/A',
    from: 'Від',
    to: 'До'
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
  backTitles: {
    mainPageTitle: 'Інформація про спинки',
    createPageTitle: 'Створити спинку',
    convertationTitle: 'Відповідна ціна в UAH'
  },
  bottomTitles: {
    mainPageTitle: 'Інформація про низи',
    createPageTitle: 'Створити низ'
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
    addBusinessPageTitle: 'Додати нову бізнес сторінку'
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
      DELIVERED: 'Відправлені',
      CANCELLED: 'Відхилені',
      CREATED: 'Створені'
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
    discoverMoreTitle: 'Дізнатись більше',
    discoverMoreSymbol: '→',
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
  pocketsTitles: {
    mainPageTitle: 'Інформація про кишені'
  },
  positionTitles: {
    mainPageTitle: 'Інформація про розміщення'
  },
  constructorListPageTitles: {
    mainPageTitle: 'Список конструкторів'
  },
  constructorModelTitles: {
    mainPageTitle: 'Опції конструктора'
  },
  closuresTitles: {
    mainPageTitle: 'Інформація про защіпки',
    convertationTitle: 'Відповідна ціна в UAH'
  },
  basicsTitles: {
    mainPageTitle: 'Інформація про основи',
    convertationTitle: 'Відповідна ціна в UAH'
  },
  strapsTitles: {
    mainPageTitle: 'Інформація про ремінці',
    convertationTitle: 'Відповідна ціна в UAH'
  },
  certificatesTitles: {
    500: '500 грн',
    1000: '1000 грн',
    1500: '1500 грн',
    mainPageTitle: 'Створити Подарунковий Сертифікат:',
    validity: 'Термін дії:',
    validFrom: 'Дійсний від',
    validUntil: 'Дійсний до',
    cost: 'Вартість:'
  }
};

export default titles;
