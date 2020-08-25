import ImportContactsIcon from '@material-ui/icons/ImportContacts';

export const routes = {
  pathToLogin: '/',
  pathToNews: '/',
  pathToNewsDetails: '/news/:id',
  pathToAddNews: '/news/add',
  pathToAddPatern: '/patern/add',
  pathToPatterns: '/patterns',
  pathToPatternDetails: '/pattern/:id'
};

export const config = {
  app: {
    title: 'Horondi Admin Portal',
    menuCategories: [
      ['Новини', routes.pathToNews, ImportContactsIcon],
      ['Гобелени', routes.pathToPatterns, ImportContactsIcon]
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
  tableHeadRowTitles: {
    news: ['Аватар', 'Автор', 'Заголовок', 'Дії'],
    pattern: ['Фото', 'Назва', 'Матеріал', 'Доступний', 'Дії']
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
    CREATE_PATTERN_TITLE: 'Додати гобелен',
    REMOVE_TITLE: 'Видалити',
    CANCEL_TITLE: 'Відмінити',
    LOGOUT_TITLE: 'Вихід'
  },
  messages: {
    REMOVE_MESSAGE: 'Ви впевнені, що хочете видалити цю новину?',
    LOGOUT_MESSAGE: 'Ви впевнені, що хочете вийти?'
  },
  patternMessages: {
    REMOVE_MESSAGE: 'Ви впевнені що хочете видалити гобелен?'
  },
  formRegExp: {
    email:
      '^([\\w-]+(?:\\.[\\w-]+)*)@((?:[\\w-]+\\.)*\\w[\\w-]{0,66})\\.([a-z]{2,6}(?:\\.[a-z]{2})?)$',
    password: '^(?!.* )(?=.*[0-9])(?=.*[A-Z]).{8,30}$'
  },
  paginationPayload: {
    skip: 0,
    limit: 5,
    newsPerPage: 6
  }
};
