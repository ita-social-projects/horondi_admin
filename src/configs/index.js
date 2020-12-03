import { colors } from '@material-ui/core';
import routes from './routes';
import menuCategories from './menu-categories';
import tableHeadRowTitles from './table-head-row-titles';
import detailTitles from './detail-titles';
import buttonTitles from './button-titles';
import statuses from './statuses';
import {
  loginErrorMessages,
  colorErrorMessages,
  contactErrorMessages,
  patternErrorMessages,
  materialErrorMessages,
  newsErrorMessages,
  errorMessages,
  modelErrorMessages,
  headerErrorMessages,
  homePageSlideErrorMessages
} from './error-messages';
import messages from './messages';
import formRegExp from './form-regexp';
import labels from './labels';
import {
  newsPaginationPayload,
  contactsPaginationPayload,
  materialPaginationPayload
} from './pagination';
import titles from './titles';
import { sort } from './sort';

export const config = {
  app: {
    title: 'Horondi Admin Portal',
    serverUrl: 'http://localhost:5000/',
    drawerWidth: 230,
    snackBarDuration: 4000,
    rowsPerPageOptions: [10, 25, 50, 100]
  },
  languages: ['ua', 'en'],
  tokenName: 'HORONDI_AUTH_TOKEN',
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
  product: {
    sortBySelectOptions: [
      {
        label: 'Популярністю',
        value: 'popularity'
      },
      {
        label: 'Від дорогих до дешевих',
        value: 'sortDesc'
      },
      {
        label: 'Від дешевих до дорогих',
        value: 'sortAsc'
      },
      {
        label: 'Рейтингом',
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
      relations: [],
      total: null
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
  messages,
  menuCategories,
  routes,
  statuses,
  tableHeadRowTitles,
  formRegExp,
  labels,
  titles,
  loginErrorMessages,
  colorErrorMessages,
  contactErrorMessages,
  patternErrorMessages,
  materialErrorMessages,
  newsErrorMessages,
  errorMessages,
  newsPaginationPayload,
  contactsPaginationPayload,
  materialPaginationPayload,
  modelErrorMessages,
  headerErrorMessages,
  homePageSlideErrorMessages,
  sort
};
export const inputTypes = {
  button: 'button',
  submit: 'submit'
};

export const badgePosition = {
  vertical: 'top',
  horizontal: 'left'
};
