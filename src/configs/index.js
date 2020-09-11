import { ImportContacts } from '@material-ui/icons';

export const routes = {
  pathToLogin: '/',
  pathToNews: '/',
  pathToNewsDetails: '/news/:id',
  pathToAddNews: '/newsadd',
  pathToMaterials: '/materials',
  pathToAddMaterial: '/material/add',
  pathToMaterialDetails: '/materials/:id'
};

export const config = {
  app: {
    title: 'Horondi Admin Portal',
    menuCategories: [
      ['Новини', routes.pathToNews, ImportContacts],
      ['Матеріали', routes.pathToMaterials, ImportContacts]
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
    materials: ['Фото', 'Назва', 'Застосування', 'Доступний', 'Дії']
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
    CANCEL_TITLE: 'Відмінити',
    LOGOUT_TITLE: 'Вихід',
    REMOVE_MATERIAL_TITLE: 'Видалити матеріал',
    CREATE_MATERIAL_TITLE: 'Створити матеріал',
    CREATE_COLOR_TITLE: 'Створити колір',
    REMOVE_COLOR_TITLE: 'Видалити колір',
    SAVE_MATERIAL: 'Зберегти матеріал'
  },
  messages: {
    REMOVE_MESSAGE: 'Ви впевнені, що хочете видалити цю новину?',
    LOGOUT_MESSAGE: 'Ви впевнені, що хочете вийти?'
  },
  materialMessages: {
    REMOVE_MESSAGE: 'Ви впевнені, що хочете видалити цей матеріал?',
    LOGOUT_MESSAGE: 'Ви впевнені, що хочете вийти?'
  },
  formRegExp: {
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
  newsErrorMessages: {
    NAME_MAX_LENGTH_MESSAGE: `Ім'я автора повинне містити не більше 100 символів`,
    NAME_MIN_LENGTH_MESSAGE: `Ім'я автора повинне містити не менше 6 символів`,
    TITLE_MAX_LENGTH_MESSAGE:
      'Заголовок повинен містити не більше 100 символів',
    TITLE_MIN_LENGTH_MESSAGE: 'Заголовок повинен містити не менше 10 символів'
  },
  materialErrorMessages: {
    MAX_LENGTH_MESSAGE: `Не більше 100 символів`,
    MIN_LENGTH_MESSAGE: `Не менше 2 символів`,
    VALIDATION_ERROR: 'Поле обовязкове'
  },
  colorErrorMessages: {
    MAX_LENGTH_MESSAGE: `Не більше 100000`,
    MIN_LENGTH_MESSAGE: `Не менше 1 символа`,
    VALIDATION_ERROR: 'Поле обовязкове'
  },
  paginationPayload: {
    skip: 0,
    limit: 5,
    newsPerPage: 6
  },
  materialPaginationPayload: {
    skip: 0,
    limit: 5,
    materialsPerPage: 6
  },
  labels: {
    material: {
      image: 'Фото матеріалу',
      purpose: 'Застосування',
      available: 'Доступний',
      name: 'Назва матеріалу',
      description: 'Опис матеріалу'
    },
    colors: {
      image: 'Фото кольору',
      name: 'Назва кольору',
      simpleName: 'Проста назва кольору',
      code: 'Код кольору',
      available: 'Доступний'
    }
  }
};
