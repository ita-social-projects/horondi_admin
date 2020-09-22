import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import ImportLocationOnIcon from '@material-ui/icons/LocationOn';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import CategoryIcon from '@material-ui/icons/Category';
import PeopleIcon from '@material-ui/icons/People';

export const routes = {
  pathToLogin: '/',
  pathToNews: '/news',
  pathToNewsDetails: '/news/:id',
  pathToAddNews: '/newsadd',
  pathToBusinessPages: '/business-pages',
  pathToAddBusinessPage: '/business-page-add',
  pathToBusinessPageDetails: '/business-pages/:id',
  pathToUsers: '/users',
  pathToUsersDetails: '/users/:id',
  pathToProducts: '/products',
  pathToAddProduct: '/add-product',
  pathToEditProduct: '/product/:id',
  pathToCategories: '/categories',
  pathToAddCategory: '/add-category',
  pathToEditCategory: '/add-category/:id',
  pathToContacts: '/contacts',
  pathToContactsEdit: '/contacts/:id',
  pathToAddContact: '/add-contact'
};

export const config = {
  app: {
    title: 'Horondi Admin Portal',
    menuCategories: [
      ['Продукти', routes.pathToProducts, ShoppingBasketIcon],
      ['Категорії', routes.pathToCategories, CategoryIcon],
      ['Користувачі', routes.pathToUsers, PeopleIcon],
      ['Бізнес сторінки', routes.pathToBusinessPages, BusinessCenterIcon],
      ['Новини', routes.pathToNews, ImportContactsIcon],
      ['Контакти', routes.pathToContacts, ImportLocationOnIcon]
    ],
    routes,
    serverUrl: 'http://localhost:5000/',
    drawerWidth: 220,
    snackBarDuration: 4000,
    rowsPerPageOptions: [10, 25, 50, 100]
  },
  languages: ['uk', 'en'],
  buttonStyles: {
    ACCEPT_BUTTON_STYLE: 'secondary'
  },
  templates: {
    categoryTemplate: {
      available: false,
      code: '',
      images: {
        large: '',
        medium: '',
        small: '',
        thumbnail: ''
      },
      isMain: false,
      name: [],
      subcategories: []
    }
  },
  tableHeadRowTitles: {
    news: ['Аватар', 'Автор', 'Заголовок', 'Дії'],
    businessPages: ['Аватар', 'Код', 'Заголовок', 'Дії'],
    products: [
      'Фото',
      'Назва',
      'Категорія',
      'Модель',
      'Гобелен',
      'Ціна(грн)',
      'Рейтинг',
      'Кількість покупок',
      'Дії'
    ],
    categories: ['№', 'Категорія', 'Дії'],
    subcategories: ['№', 'Підкатегорія', 'Доступна', 'Дії'],
    categoryName: ['№', 'Мова', 'Назва', 'Дії'],
    categoryImages: ['№', 'Розмір', 'Посилання', 'Дії'],
    users: ['Аватар', "Ім'я", 'Мобільний номер', 'Пошта', 'Статус', 'Дії'],
    contacts: ['Номер телефону', 'Email', 'Адреса', 'Дії']
  },
  detailTitles: {
    users: {
      avatar: { id: 'avatar' },
      name: { id: 'name' },
      status: { id: 'status' },
      primarySection: [
        { id: 'country', label: 'Країна' },
        { id: 'city', label: 'Місто' }
      ],
      secondarySection: [
        { id: 'adress', label: 'Адреса' },
        { id: 'postCode', label: 'Поштовий індекс' }
      ]
    }
  },
  tableSizes: {
    SMALL_SIZE: 'small',
    DEFAULT_SIZE: 'medium'
  },
  iconSizes: {
    SMALL_SIZE: 'small',
    DEFAULT_SIZE: 'default'
  },
  theme: {
    DARK_THEME: 'dark',
    LIGHT_THEME: 'light'
  },
  statuses: {
    SUCCESS_ADD_STATUS: 'Успішно додано!',
    SUCCESS_DELETE_STATUS: 'Успішно видалено!',
    SUCCESS_UPDATE_STATUS: 'Успішно змінено!',
    ERROR_PAGE_STATUS: 'Сторінку не знайдено!',
    USER_ACTIVE_STATUS: 'Активний(-a)',
    USER_INACTIVE_STATUS: 'Неактивний(-a)',
    LOGIN_PAGE_STATUS: 'Невірний логін або пароль'
  },
  errorMessages: {
    USER_NOT_FOUND: 'Користувач не знайдений!',
    USER_NOT_AUTHORIZED: 'Користувач не отримав прав доступу'
  },
  buttonTitles: {
    DELETE_TITLE: 'Видалити',
    EDIT_TITLE: 'Редагувати',
    CREATE_NEWS_TITLE: 'Додати новину',
    REMOVE_TITLE: 'Видалити новину',
    REMOVE_BUSINESS_PAGE_TITLE: 'Видалити сторінку',
    CANCEL_TITLE: 'Відмінити',
    LOGOUT_TITLE: 'Вихід',
    CREATE_BUSINESS_PAGE: 'Додати бізнес сторінку'
  },
  messages: {
    REMOVE_MESSAGE: 'Ви впевнені, що хочете видалити цю новину?',
    REMOVE_BUSINESS_PAGE: 'Ви впевнені, що хочете видалити цю сторінку?',
    LOGOUT_MESSAGE: 'Ви впевнені, що хочете вийти?',
    CREATE_CONTACT_TITLE: 'Додати контакти',
    REMOVE_CONTACT_TITLE: 'Видалити контакт',
    REMOVE_USER_TITLE: 'Видалити користувача',
    SWITCH_USER_STATUS_TITLE: 'Змінити статус користувача',
    CANCEL_TITLE: 'Відмінити',
    LOGOUT_TITLE: 'Вихід',
    ADD_CATEGORY: 'Додати категорію',
    DELETE_CATEGORY: 'Видалити категорію',
    ADD_SUBCATEGORY: 'Додати підкатегорію',
    ADD_CATEGORY_IMAGE: 'Зберегти посилання',
    ADD_CATEGORY_NAME: 'Додати назву',
    CANCEL: 'Відмінити',
    SAVE_CATEGORY: 'Зберегти категорію',
    SAVE_SUBCATEGORY: 'Зберегти підкатегорію',
    CREATE_CATEGORY: 'Створити категорію',
    CREATE_SUBCATEGORY: 'Створити підкатегорію',
    titleGenerator: (editMode, isMain) => {
      const editModeMap = new Map([
        [true, 'Зберегти'],
        [false, 'Створити']
      ]);
      const isMainMap = new Map([
        [true, 'категорію'],
        [false, 'підкатегорію']
      ]);
      return `${editModeMap.get(editMode)} ${isMainMap.get(isMain)}`;
    },
    GO_BACK_TITLE: 'Назад'
  },
  formRegExp: {
    email:
      '^([\\w-]+(?:\\.[\\w-]+)*)@((?:[\\w-]+\\.)*\\w[\\w-]{0,66})\\.([a-z]{2,6}(?:\\.[a-z]{2})?)$',
    password: '^(?!.* )(?=.*[0-9])(?=.*[A-Z]).{8,30}$',
    unwrapHtml: /(<([^>]+)>)/gi,
    enAddressRegex: '^[A-Za-z0-9_|,| |./]+$',
    editorField: /^<p><br><\/p>$/
  },
  loginErrorMessages: {
    INVALID_EMAIL_MESSAGE: 'Некоректна email адреса',
    ENTER_EMAIL_MESSAGE: 'Введіть email',
    PASSWORD_MIN_LENGTH_MESSAGE: 'Пароль повинен містити не менше 8 символів',
    PASSWORD_LANG_MESSAGE: 'Використовуйте латиницю різних регістрів та цифри',
    ENTER_PASSWORD_MESSAGE: 'Введіть пароль'
  },
  newsErrorMessages: {
    NAME_MAX_LENGTH_MESSAGE: `Ім'я автора повинне містити не більше 100 символів`,
    NAME_MIN_LENGTH_MESSAGE: `Ім'я автора повинне містити не менше 6 символів`,
    TITLE_MAX_LENGTH_MESSAGE:
      'Заголовок повинен містити не більше 100 символів',
    TITLE_MIN_LENGTH_MESSAGE: 'Заголовок повинен містити не менше 10 символів'
  },
  contactErrorMessages: {
    INVALID_EMAIL_MESSAGE: 'Некоректна email адреса',
    ENTER_EMAIL_MESSAGE: 'Введіть email',
    PHONE_NUMBER_LENGTH_MESSAGE:
      'Довжина номеру телефону повинна містити 12 символів',
    PHONE_NUMBER_TYPE_MESSAGE: 'Номер повинен містити лише числа',
    ENTER_PHONE_NUMBER_MESSAGE: 'Введіть номер',
    INPUT_LENGTH_MESSAGE: 'Довжина повинна містити не менше 10 символів',
    ENTER_UK_SCHEDULE_MESSAGE: 'Введіть розклад українською',
    ENTER_EN_SCHEDULE_MESSAGE: 'Введіть розклад англійською',
    ENTER_UK_ADDRESS_MESSAGE: 'Введіть адресу українською',
    ENTER_EN_ADDRESS_MESSAGE: 'Введіть адресу англійською',
    IMAGE_FORMAT_MESSAGE:
      'Введіть коректний формат, наприклад: https://example.com/',
    ENTER_LINK_MESSAGE: 'Введіть посилання'
  },
  paginationPayload: {
    skip: 0,
    limit: 5,
    newsPerPage: 6
  },
  contactsPaginationPayload: {
    skip: 0,
    limit: 6,
    contactsPerPage: 7
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
      'Оберіть опційні параметри',
      'Завантажте фото для продукту',
      'Підтвердження створення продукту'
    ],
    infoLabels: [
      { label: 'Назва', name: 'name', required: true },
      { label: 'Основний матеріал', name: 'mainMaterial', required: true },
      { label: 'Внутрішній матеріал', name: 'innerMaterial', required: false },
      { label: 'Замок', name: 'closure', required: false },
      { label: 'Опис', name: 'description', required: false }
    ],
    selectsLabels: [
      { label: 'Категорія ', name: 'category', type: 'select', required: true },
      { label: 'Підкатегорія ', name: 'subcategory', type: 'select', required: true },
      { label: 'Модель ', name: 'model', type: 'select', required: true },
      { label: 'Колір ', name: 'colors', type: 'select', required: true },
      { label: 'Гобелен ', name: 'pattern', type: 'select', required: true },
      { label: 'Ціна(USD) ', name: 'basePrice', type: 'number', required: true },
      { label: 'Довжина лямок(см) ', name: 'strapLengthInCm', type: 'number', required: false }
    ],
    responsive: {
      superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 1
      },
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 1
      },
      tablet: {
        breakpoint: { max: 1146, min: 464 },
        items: 1
      },
      mobile: {
        breakpoint: { max: 810, min: 0 },
        items: 1
      }
    },
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
    }
  },
  popularity: 'popularity',
  rate: 'rate',
  sortAsc: 'sortAsc',
  sortDesc: 'sortDesc',
  submitKey: 'Enter',
  selectedLanguages: {
    uk: {
      name: 'uk',
      checked: false
    },
    en: {
      name: 'en',
      checked: false
    }
  },
  initialLanguageValues: [
    { lang: 'uk', value: '' },
    { lang: 'en', value: '' }
  ],
  imagePrefix: 'https://horondi.blob.core.windows.net/horondi/images/'
};
