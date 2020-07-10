import ImportContactsIcon from '@material-ui/icons/ImportContacts';

const languages = ['uk', 'en'];

const routes = {
  pathToNews: '/',
  pathToNewsDetails: '/news/:id',
  pathToAddNews: '/newsadd'
};

const theme = {
  DARK_THEME: 'dark',
  LIGHT_THEME: 'light'
};

const buttonTitles = {
  DELETE_TITLE: 'Видалити',
  EDIT_TITLE: 'Редагувати',
  CREATE_NEWS_TITLE: 'Додати новину'
};

const statuses = {
  SUCCESS_ADD_STATUS: 'Успішно додано!'
};

export const config = {
  app: {
    title: 'Horondi Admin Portal',
    menuCategories: [['News', routes.pathToNews, ImportContactsIcon]],
    routes,
    theme,
    languages,
    buttonTitles,
    statuses,
    serverUrl: 'http://localhost:5000/',
    drawerWidth: 220,
    snackBarDuration: 4000,
    rowsPerPageOptions: [10, 25, 50, 100]
  },
  tableHeadRowTitles: {
    news: ['Аватар', 'Автор', 'Заголовок', 'Дії']
  },
  tableSizes: {
    SMALL_SIZE: 'small',
    DEFAULT_SIZE: 'medium'
  }
};

export const IMG_URL =
  'https://www.yourwdwstore.net/assets/images/6/60000/7000/600/67670-s1.jpg';
