import ImportContactsIcon from '@material-ui/icons/ImportContacts';

const routes = {
  pathToLogin: '/',
  pathToNews: '/',
  pathToNewsDetails: '/news/:id',
  pathToAddNews: '/newsadd'
};

export const errLocalization = {
  NEWS_NOT_FOUND: 'Новину не знайдено!',
  NEWS_ALREADY_EXIST: 'Така новина вже існує!',
  CATEGORY_NOT_FOUND: 'Категорія не знайдена!',
  CATEGORY_ALREADY_EXIST: 'Така категорія вже існує!',
  CURRENCY_NOT_FOUND: 'Курс валюти не знайдений!',
  CURRENCY_ALREADY_EXIST: 'Такий курс валюти вже існує!',
  MATERIAL_NOT_FOUND: 'Матеріал не знайдений!',
  MATERIAL_ALREADY_EXIST: 'Такий матеріал вже існує!',
  PATTERN_NOT_FOUND: 'Гобелен не знайдений!',
  PATTERN_ALREADY_EXIST: 'Такий гобелен вже існує!'
};

export const config = {
  app: {
    title: 'Horondi Admin Portal',
    menuCategories: [['Новини', routes.pathToNews, ImportContactsIcon]],
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
  tableHeadRowTitles: {
    news: ['Аватар', 'Автор', 'Заголовок', 'Дії']
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
    ERROR_PAGE_STATUS: 'Сторінку не знайдено!'
  },
  buttonTitles: {
    DELETE_TITLE: 'Видалити',
    EDIT_TITLE: 'Редагувати',
    CREATE_NEWS_TITLE: 'Додати новину',
    REMOVE_TITLE: 'Видалити новину',
    CANCEL_TITLE: 'Відмінити',
    LOGOUT_TITLE: 'Вихід'
  },
  messages: {
    REMOVE_MESSAGE: 'Ви впевнені, що хочете видалити цю новину?',
    LOGOUT_MESSAGE: 'Ви впевнені, що хочете вийти?'
  },
  formRegExp: {
    email:
      '^([\\w-]+(?:\\.[\\w-]+)*)@((?:[\\w-]+\\.)*\\w[\\w-]{0,66})\\.([a-z]{2,6}(?:\\.[a-z]{2})?)$',
    password: '^(?!.* )(?=.*[0-9])(?=.*[A-Z]).{8,30}$'
  }
};
