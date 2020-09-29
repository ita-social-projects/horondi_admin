import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import ImportLocationOnIcon from '@material-ui/icons/LocationOn';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import CategoryIcon from '@material-ui/icons/Category';
import PeopleIcon from '@material-ui/icons/People';
import SmsIcon from '@material-ui/icons/Sms';
import PaletteIcon from '@material-ui/icons/Palette';

export const routes = {
  pathToLogin: '/',
  pathToPatterns: '/patterns',
  pathToPatternDetails: '/patterns/:id',
  pathToAddPattern: '/patterns/add',
  pathToNews: '/news',
  pathToNewsDetails: '/news/:id',
  pathToAddNews: '/newsadd',
  pathToBusinessPages: '/business-pages',
  pathToAddBusinessPage: '/business-page-add',
  pathToBusinessPageDetails: '/business-pages/:id',
  pathToUsers: '/users',
  pathToUsersDetails: '/users/:id',
  pathToProducts: '/products',
  pathToCategories: '/categories',
  pathToAddCategory: '/add-category',
  pathToEditCategory: '/add-category/:id',
  pathToRegisterAdmin: '/register',
  pathToConfirmAdmin: '/confirmation/:token',
  pathToContacts: '/contacts',
  pathToContactsEdit: '/contacts/:id',
  pathToAddContact: '/add-contact',
  pathToComments: '/comments'
};

export const config = {
  app: {
    title: 'Horondi Admin Portal',
    menuCategories: [
      ['Новини', routes.pathToNews, ImportContactsIcon],
      ['Бізнес сторінки', routes.pathToBusinessPages, BusinessCenterIcon],
      ['Контакти', routes.pathToContacts, ImportLocationOnIcon],
      ['Категорії', routes.pathToCategories, CategoryIcon],
      ['Продукти', routes.pathToProducts, ShoppingBasketIcon],
      ['Користувачі', routes.pathToUsers, PeopleIcon],
      ['Останні коментарі', routes.pathToComments, SmsIcon],
      ['Гобелени', routes.pathToPatterns, PaletteIcon]
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
  userRoles: [{ role: 'admin', label: 'Адмін' }],
  tableHeadRowTitles: {
    news: ['Аватар', 'Автор', 'Заголовок', 'Дії'],
    patterns: ['Фото', 'Назва', 'Код матеріалу', 'Доступний', 'Дії'],
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
    users: [
      'Аватар',
      "Ім'я",
      'Мобільний номер',
      'Пошта',
      'Роль',
      'Статус',
      'Дії'
    ],
    contacts: ['Номер телефону', 'Email', 'Адреса', 'Дії'],
    comments: ['Дата', 'Текст', 'Дії']
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
    SUCCESS_CREATION_STATUS: 'Успішно створено!',
    SUCCESS_DELETE_STATUS: 'Успішно видалено!',
    SUCCESS_UPDATE_STATUS: 'Успішно змінено!',
    SUCCESS_CONFIRMATION_STATUS: 'Успішно підтверджено реєстрацію!',
    ERROR_PAGE_STATUS: 'Сторінку не знайдено!',
    USER_ACTIVE_STATUS: 'Активний(-a)',
    USER_INACTIVE_STATUS: 'Неактивний(-a)',
    LOGIN_PAGE_STATUS: 'Невірний логін або пароль'
  },
  errorMessages: {
    USER_NOT_FOUND: 'Користувач не знайдений!',
    USER_NOT_AUTHORIZED: 'Користувач не отримав прав доступу',
    INVALID_PERMISSIONS: 'Недостатньо прав користувача',
    WRONG_CREDENTIALS: 'Неправильно вказані вхідні дані',
    INPUT_NOT_VALID: 'Неправильні ввідні дані',
    USER_ALREADY_EXIST: 'Користувач з такими даними вже існує',
    INVALID_ADMIN_INVITATIONAL_TOKEN:
      'Неправильне посилання на створення користувача'
  },
  buttonTitles: {
    DELETE_TITLE: 'Видалити',
    EDIT_TITLE: 'Редагувати',
    CREATE_NEWS_TITLE: 'Додати новину',
    CREATE_PATTERN_TITLE: 'Додати гобелен',
    REMOVE_TITLE: 'Видалити новину',
    PATTERN_REMOVE_TITLE: 'Видалити гобелен',
    REMOVE_BUSINESS_PAGE_TITLE: 'Видалити сторінку',
    CANCEL_TITLE: 'Відмінити',
    LOGOUT_TITLE: 'Вихід',
    CREATE_BUSINESS_PAGE: 'Додати бізнес сторінку',
    CREATE_CONTACT_TITLE: 'Додати контакти',
    REMOVE_CONTACT_TITLE: 'Видалити контакт',
    REMOVE_USER_TITLE: 'Видалити користувача',
    SWITCH_USER_STATUS_TITLE: 'Змінити статус користувача',
    USER_INACTIVE_TITLE: 'Деактивувати',
    USER_ACTIVE_TITLE: 'Активувати',
    ADD_CATEGORY: 'Додати категорію',
    GO_BACK_TITLE: 'Назад',
    DELETE_CATEGORY: 'Видалити категорію',
    ADD_SUBCATEGORY: 'Додати підкатегорію',
    ADD_CATEGORY_IMAGE: 'Зберегти посилання',
    ADD_CATEGORY_NAME: 'Додати назву',
    CANCEL: 'Відмінити',
    SAVE_CATEGORY: 'Зберегти категорію',
    SAVE_SUBCATEGORY: 'Зберегти підкатегорію',
    CREATE_SPECIAL_USER: 'Створити спецкористувача',
    CREATE_CATEGORY: 'Створити категорію',
    CREATE_SUBCATEGORY: 'Створити підкатегорію',
    PATTERN_REMOVE_MESSAGE: 'Ви впевнені, що хочете видалити цей гобелен?',
    REMOVE_CONTACT_MESSAGE: 'Ви впевнені, що хочете видалити цей контакт?',
    USER_UNACTIVE_TITLE: 'Деактивувати',
    REMOVE_COMMENT_TITLE: 'Видалити коментар',
    SHOW_COMMENTS_TITLE: 'Переглянути коментарі',
    HIDE_COMMENTS_TITLE: 'Приховати коментарі'
  },
  messages: {
    REMOVE_MESSAGE: 'Ви впевнені, що хочете видалити цю новину?',
    REMOVE_BUSINESS_PAGE: 'Ви впевнені, що хочете видалити цю сторінку?',
    LOGOUT_MESSAGE: 'Ви впевнені, що хочете вийти?',
    DELETE_CATEGORY_MESSAGE: 'Ви впевнені, що хочете видалити цю категорію?',
    REMOVE_USER_MESSAGE: 'Ви впевнені,що хочете видалити цього користувача?',
    SWITCH_USER_STATUS_MESSAGE:
      'Ви впевнені,що хочете змінити статус користувача?',
    REMOVE_CONTACT_MESSAGE: 'Ви впевнені,що хочете видалити цей контакт?',
    REMOVE_COMMENT_MESSAGE: 'Ви впевнені, що хочете видалити цей коментар?',
    NO_COMMENTS_MESSAGE: 'Коментарі відсутні',
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
    }
  },
  formRegExp: {
    patternMaterial: '^[A-Za-z][A-Za-z0-9]*$',
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
    PASSWORD_MAX_LENGTH_MESSAGE: 'Пароль повинен містити не більше 20 символів',
    PASSWORD_LANG_MESSAGE: 'Використовуйте латиницю різних регістрів та цифри',
    ENTER_FIRSTNAME_MESSAGE: "Введіть ім'я",
    ENTER_LASTNAME_MESSAGE: 'Введіть прізвище',
    ENTER_PASSWORD_MESSAGE: 'Введіть пароль',
    FIRSTNAME_MIN_LENGTH_MESSAGE: "Ім'я повинно містити не менше 2 символів",
    LASTNAME_MIN_LENGTH_MESSAGE: 'Прізвище повинно містити не менше 2 символів',
    FIRSTNAME_MAX_LENGTH_MESSAGE: "Ім'я повинно містити не більше 30 символів",
    LASTNAME_MAX_LENGTH_MESSAGE:
      'Прізвище повинно містити не більше 30 символів',
    SELECT_ROLE_MESSAGE: 'Оберіть роль'
  },
  patternErrorMessages: {
    PATTERN_VALIDATION_ERROR: 'Мінімум 2 символи',
    PATTERN_ERROR_MESSAGE: 'Поле не може бути порожнім',
    PATTERN_ERROR_ENGLISH_AND_DIGITS_ONLY: 'Тільки англійські букви і цифри'
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
    ENTER_LINK_MESSAGE: 'Введіть посилання',
    SELECT_IMAGES_MESSAGE: 'Завантажте зображення для карт'
  },
  paginationPayload: {
    skip: 0,
    limit: 5,
    countPerPage: 6
  },
  labels: {
    pattern: {
      image: 'Фото гобелена',
      material: 'Код матеріалу',
      available: 'Доступний',
      handmade: 'Зроблений вручну',
      avatarText: 'Фото'
    }
  },
  patternImageLink: `https://horondi.blob.core.windows.net/horondi/images/`,
  newsPerPage: 6,
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
    ]
  },
  popularity: 'popularity',
  rate: 'rate',
  sortAsc: 'sortAsc',
  sortDesc: 'sortDesc',
  submitKey: 'Enter',
  imagePrefix: 'https://horondi.blob.core.windows.net/horondi/images/'
};
