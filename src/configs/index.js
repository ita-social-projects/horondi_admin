import routes from './routes';
import menuCategories from './menu-categories';
import tableHeadRowTitles from './table-head-row-titles';
import detailTitles from './detail-titles';
import buttonTitles from './button-titles';
import statuses from './statuses';
import {
  errorMessages,
  loginErrorMessages,
  contactErrorMessages,
  patternErrorMessages,
  newsErrorMessages
} from './error-messages';
import messages from './messages';
import formRegExp from './form-regexp';
import labels from './labels';
import * as pagination from './pagination';
import titles from './titles';

export const config = {
  app: {
    title: 'Horondi Admin Portal',
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
  userRoles: [
    { role: 'user', label: 'Юзер' },
    { role: 'admin', label: 'Адмін' },
    { role: 'superadmin', label: 'Суперадмін' }
  ],
  allowedforRegistrationRoles: ['admin'],
  tabNames: {
    users: ['Користувачі', 'Адміністратори']
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
  paginationPayload: {
    skip: 0,
    limit: 5,
    countPerPage: 6
  },
  IMG_URL: 'https://horondi.blob.core.windows.net/horondi/images/',
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
  imagePrefix: 'https://horondi.blob.core.windows.net/horondi/images/',
  buttonTitles,
  detailTitles,
  errorMessages,
  loginErrorMessages,
  contactErrorMessages,
  patternErrorMessages,
  newsErrorMessages,
  messages,
  menuCategories,
  routes,
  statuses,
  tableHeadRowTitles,
  formRegExp,
  labels,
  pagination,
  titles
};
