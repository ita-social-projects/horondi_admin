import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import ImportLocationOnIcon from '@material-ui/icons/LocationOn';

const routes = {
  pathToLogin: '/',
  pathToNews: '/',
  pathToNewsDetails: '/news/:id',
  pathToAddNews: '/newsadd',
  pathToContacts: '/contacts',
  pathToContactsEdit: '/contacts/:id',
  pathToAddContact: '/contactadd'
};

export const config = {
  app: {
    title: 'Horondi Admin Portal',
    menuCategories: [
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
  tableHeadRowTitles: {
    news: ['Аватар', 'Автор', 'Заголовок', 'Дії'],
    contacts: ['Аватар', 'Номер', 'Email', 'Адреса', 'Дії']
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
    LOGIN_PAGE_STATUS: 'Невірний логін або пароль'
  },
  buttonTitles: {
    DELETE_TITLE: 'Видалити',
    EDIT_TITLE: 'Редагувати',
    CREATE_NEWS_TITLE: 'Додати новину',
    REMOVE_TITLE: 'Видалити новину',
    REMOVE_CONTACT_TITLE: 'Видалити контакт',
    CANCEL_TITLE: 'Відмінити',
    LOGOUT_TITLE: 'Вихід',
    CREATE_CONTACT_TITLE: 'Додати контакти'
  },
  messages: {
    REMOVE_MESSAGE: 'Ви впевнені, що хочете видалити цю новину?',
    REMOVE_CONTACT_MESSAGE: 'Ви впевнені, що хочете видалити цей контакт?',
    LOGOUT_MESSAGE: 'Ви впевнені, що хочете вийти?'
  },
  formRegExp: {
    email:
      '^([\\w-]+(?:\\.[\\w-]+)*)@((?:[\\w-]+\\.)*\\w[\\w-]{0,66})\\.([a-z]{2,6}(?:\\.[a-z]{2})?)$',
    password: '^(?!.* )(?=.*[0-9])(?=.*[A-Z]).{8,30}$',
    unwrapHtml: /(<([^>]+)>)/gi
  },
  loginErrorMessages: {
    INVALID_EMAIL_MESSAGE: 'Некоректна email адреса',
    ENTER_EMAIL_MESSAGE: 'Введіть email',
    PASSWORD_MIN_LENGTH_MESSAGE: 'Пароль повинен містити не менше 8 символів',
    PASSWORD_LANG_MESSAGE: 'Використовуйте латиницю різних регістрів та цифри',
    ENTER_PASSWORD_MESSAGE: 'Введіть пароль'
  },
  contactErrorMessages: {
    INVALID_EMAIL_MESSAGE: 'Некоректна email адреса',
    ENTER_EMAIL_MESSAGE: 'Введіть email',
    PHONE_NUMBER_LENGTH_MESSAGE:
      'Довжина номеру телефону повинна становити 12 символів',
    PHONE_NUMBER_TYPE_MESSAGE: 'Номер повинен містити лише числа',
    PHONE_NUMBER_FORMAT_MESSAGE: 'Неправильний формат номеру',
    ENTER_PHONE_NUMBER_MESSAGE: 'Введіть номер',
    INPUT_LENGTH_MESSAGE: 'Довжина повинна становити не менше 10 символів',
    ENTER_SCHEDULE_MESSAGE: 'Введіть розклад',
    ENTER_ADDRESS_MESSAGE: 'Введіть адресу',
    IMAGE_FORMAT_MESSAGE: 'Некоректний формат',
    ENTER_LINK_MESSAGE: 'Введіть посилання'
  },
  paginationPayload: {
    skip: 0,
    limit: 5,
    newsPerPage: 6
  }
};
