import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import CategoryIcon from '@material-ui/icons/Category';
import PeopleIcon from '@material-ui/icons/People';
import PaletteIcon from '@material-ui/icons/Palette';

export const routes = {
  pathToLogin: '/',
  pathToNews: '/',
  pathToPatterns: '/patterns',
  pathToAddNews: '/newsadd',
  pathToNewsDetails: '/news/:id',
  pathToPatternDetails: '/patterns/:id',
  pathToAddPattern: '/patterns/add',
  pathToUsers: '/users',
  pathToUsersDetails: '/users/:id',
  pathToProducts: '/products',
  pathToCategories: '/categories',
  pathToAddCategory: '/add-category',
  pathToEditCategory: '/add-category/:id'
};

export const config = {
  app: {
    title: 'Horondi Admin Portal',
    menuCategories: [
      ['Новини', routes.pathToNews, ImportContactsIcon],
      ['Категорії', routes.pathToCategories, CategoryIcon],
      ['Продукти', routes.pathToProducts, ShoppingBasketIcon],
      ['Користувачі', routes.pathToUsers, PeopleIcon],
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
  tableHeadRowTitles: {
    news: ['Аватар', 'Автор', 'Заголовок', 'Дії'],
    patterns: ['Фото', 'Назва', 'Код матеріалу', 'Доступний', 'Дії'],
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
    users: ['Аватар', "Ім'я", 'Мобільний номер', 'Пошта', 'Статус', 'Дії']
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
    CREATE_PATTERN_TITLE: 'Додати гобелен',
    REMOVE_TITLE: 'Видалити новину',
    PATTERN_REMOVE_TITLE: 'Видалити гобелен',
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
    }
  },
  messages: {
    REMOVE_MESSAGE: 'Ви впевнені, що хочете видалити цю новину?',
    PATTERN_REMOVE_MESSAGE: 'Ви впевнені, що хочете видалити цей гобелен?',
    LOGOUT_MESSAGE: 'Ви впевнені, що хочете вийти?',
    DELETE_CATEGORY_MESSAGE: 'Ви впевнені, що хочете видалити цю категорію?',
    USER_UNACTIVE_TITLE: 'Деактивувати',
    USER_ACTIVE_TITLE: 'Активувати',
    REMOVE_USER_MESSAGE: 'Ви впевнені,що хочете видалити цього користувача?',
    SWITCH_USER_STATUS_MESSAGE:
      'Ви впевнені,що хочете змінити статус користувача?'
  },
  formRegExp: {
    patternMaterial: '[a-zA-z]',
    email:
      '^([\\w-]+(?:\\.[\\w-]+)*)@((?:[\\w-]+\\.)*\\w[\\w-]{0,66})\\.([a-z]{2,6}(?:\\.[a-z]{2})?)$',
    password: '^(?!.* )(?=.*[0-9])(?=.*[A-Z]).{8,30}$'
  },
  loginErrorMessages: {
    INVALID_EMAIL_MESSAGE: 'Некоректна email адреса',
    ENTER_EMAIL_MESSAGE: 'Введіть email',
    PASSWORD_MIN_LENGTH_MESSAGE: 'Пароль повинен містити не менше 8 символів',
    PASSWORD_LANG_MESSAGE: 'Використовуйте латиницю різних регістрів та цифри',
    ENTER_PASSWORD_MESSAGE: 'Введіть пароль'
  },
  patternErrorMessages: {
    PATTERN_VALIDATION_ERROR: 'Мінімум 2 символи',
    PATTERN_ERROR_MESSAGE: 'Поле не може бути порожнім'
  },
  newsErrorMessages: {
    NAME_MAX_LENGTH_MESSAGE: `Ім'я автора повинне містити не більше 100 символів`,
    NAME_MIN_LENGTH_MESSAGE: `Ім'я автора повинне містити не менше 6 символів`,
    TITLE_MAX_LENGTH_MESSAGE:
      'Заголовок повинен містити не більше 100 символів',
    TITLE_MIN_LENGTH_MESSAGE: 'Заголовок повинен містити не менше 10 символів'
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
  submitKey: 'Enter'
};
