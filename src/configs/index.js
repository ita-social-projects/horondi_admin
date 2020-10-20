import { colors } from '@material-ui/core';
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
  newsErrorMessages,
  modelErrorMessages
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
  forbiddenRolesFromDeleting: ['superadmin'],
  dialogFormTitles: {
    REGISTER_ADMIN: 'Створити спецкористувача'
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
    }
  },
  popularity: 'popularity',
  rate: 'rate',
  sortAsc: 'sortAsc',
  sortDesc: 'sortDesc',
  submitKey: 'Enter',
  imagePrefix: 'https://horondi.blob.core.windows.net/horondi/images/',
  initialLanguageValues: [
    {
      lang: 'uk',
      value: ''
    },
    {
      lang: 'en',
      value: ''
    }
  ],
  doughnut: {
    colors: [
      colors.green[500],
      colors.red[700],
      colors.amber[600],
      colors.indigo[500]
    ],
    initialValues: {
      names: [],
      counts: [],
      relations: []
    }
  },
  bar: {
    initialValues: {
      labels: [],
      counts: []
    }
  },
  UAH: 'грн',
  buttonTitles,
  detailTitles,
  errorMessages,
  loginErrorMessages,
  contactErrorMessages,
  modelErrorMessages,
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
