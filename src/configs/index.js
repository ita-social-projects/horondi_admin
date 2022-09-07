import { colors } from '@material-ui/core';
import routes from './routes';
import {
  menuCategories,
  clientMenuCategories,
  catalogMenuCategories,
  staticPagesCategories,
  constructorMenuCategories,
  certificatesMenuCategories,
  promoMenuCategories,
  materialMenuCategories,
  allCategories
} from './menu-categories';
import tableHeadRowTitles from './table-head-row-titles';
import detailTitles from './detail-titles';
import buttonTitles from './button-titles';
import statuses from './statuses';
import filterLabels from './filter-labels';
import materialUiConstants from './material-ui-constants';
import { materialMessages } from './material-messages';
import { slidesMessages } from './slides-messages';
import {
  constructorErrors,
  businessPageErrors,
  bottomTranslations,
  categoryErrors,
  colorsTranslations,
  contactTranslations,
  headerTranslations,
  modelTranslations,
  newsErrors,
  patternTranlations,
  homePageEditErrors,
  commentsErrors,
  slidesTranslations,
  materialTranslations,
  productsErrors,
  userTranslations,
  backTranslations,
  errorStatuses
} from './error-modal-messages';
import {
  commonErrorMessages,
  loginErrorMessages,
  colorErrorMessages,
  contactErrorMessages,
  patternErrorMessages,
  backErrorMessages,
  bottomErrorMessages,
  materialErrorMessages,
  newsErrorMessages,
  errorMessages,
  categoryErrorMessages,
  modelErrorMessages,
  headerErrorMessages,
  constructorErrorMessages,
  statsErrorMessages,
  paginationInputErrorMessages,
  sizeErrorMessages,
  businessPageErrorMessages,
  productErrorMessages,
  pocketsErrorMessages,
  closuresErrorMessages,
  basicsErrorMessages,
  strapsErrorMessages,
  userErrorMessages,
  promoCodeErrorMessages,
  aboutUsPageErrorMessages,
  materialAboutErrorMessages
} from './error-messages';
import messages from './messages';
import formRegExp from './form-regexp';
import labels from './labels';
import { newsPaginationPayload, contactsPaginationPayload } from './pagination';
import { productsTranslations } from './product-translations';
import { tableTranslations } from './table-translations';
import { userRoleTranslations } from './user-role-translations';
import titles from './titles';
import languages from './languages';
import {
  imageUploadNewsInputsId,
  valueKeys,
  inputNames
} from './news-form-helpers';
import { imageUploadSlideInputsId } from './home-page-slide-helpers';

export const config = {
  fetchPolicy: 'no-cache',
  app: {
    title: 'Horondi Admin Portal',
    serverUrl: 'http://localhost:5000/',
    drawerWidth: 363,
    snackBarDuration: 4000,
    rowsPerPageOptions: [10, 25, 50, 100]
  },
  languages,
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
      name: []
    }
  },
  imgSizes: {
    large: 'large',
    medium: 'medium',
    small: 'small',
    thumbnail: 'thumbnail'
  },
  userRole: {
    user: 'user',
    admin: 'admin',
    superadmin: 'superadmin'
  },
  userRoles: [
    { role: 'user', label: 'Користувач' },
    { role: 'admin', label: 'Адмін' },
    { role: 'superadmin', label: 'Суперадмін' }
  ],
  allowedforRegistrationRoles: ['admin', 'superadmin'],
  tabNames: {
    users: ['Користувачі', 'Адміністратори'],
    userOrdersComments: ['Замовлення', 'Коментарі']
  },
  tableSizes: {
    SMALL_SIZE: 'small',
    DEFAULT_SIZE: 'medium'
  },
  iconSizes: {
    SMALL_SIZE: 'small',
    DEFAULT_SIZE: 'default'
  },
  colorCircleSizes: {
    SMALL_CIRCLE: '25px',
    DEFAULT_CIRCLE: '50px'
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
  sizesAvailableVariants: {
    AVAILABLE_TEXT: 'Доступний',
    UNAVAILABLE_TEXT: 'Відсутній'
  },
  pocketsAvailableVariants: {
    AVAILABLE_TEXT: 'Доступний',
    UNAVAILABLE_TEXT: 'Недоступний'
  },
  strapsAvailableVariants: {
    AVAILABLE_TEXT: 'Доступний',
    UNAVAILABLE_TEXT: 'Недоступний'
  },
  closuresAvailableVariants: {
    AVAILABLE_TEXT: 'Доступний',
    UNAVAILABLE_TEXT: 'Недоступний'
  },
  positionAvailableVariants: {
    AVAILABLE_TEXT: 'Доступна',
    UNAVAILABLE_TEXT: 'Недоступна'
  },
  basicsAvailableVariants: {
    AVAILABLE_TEXT: 'Доступна',
    UNAVAILABLE_TEXT: 'Недоступна'
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
  imagePreviewId: 'imagePreviewContainerId',
  initialLanguageValues: [
    {
      lang: 'ua',
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
      colors.indigo[500],
      colors.lime[600],
      colors.purple[900],
      colors.red[300]
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
  constructorItemsKeys: {
    bottom: 'bottom',
    basic: 'basic',
    back: 'back',
    strap: 'strap',
    closure: 'closure',
    pocket: 'pocket',
    pattern: 'pattern',
    position: 'position'
  },
  UAH: 'грн',
  maxItemsPerPage: 10,
  buttonTitles,
  detailTitles,
  messages,
  allCategories,
  menuCategories,
  materialMenuCategories,
  clientMenuCategories,
  catalogMenuCategories,
  promoMenuCategories,
  constructorMenuCategories,
  certificatesMenuCategories,
  staticPagesCategories,
  routes,
  statuses,
  tableHeadRowTitles,
  formRegExp,
  labels,
  titles,
  commonErrorMessages,
  promoCodeErrorMessages,
  loginErrorMessages,
  colorErrorMessages,
  contactErrorMessages,
  categoryErrorMessages,
  patternErrorMessages,
  backErrorMessages,
  bottomErrorMessages,
  materialErrorMessages,
  newsErrorMessages,
  errorMessages,
  newsPaginationPayload,
  productsTranslations,
  tableTranslations,
  userRoleTranslations,
  contactsPaginationPayload,
  modelErrorMessages,
  headerErrorMessages,
  statsErrorMessages,
  constructorErrorMessages,
  paginationInputErrorMessages,
  filterLabels,
  materialUiConstants,
  materialTranslations,
  slidesTranslations,
  sizeErrorMessages,
  businessPageErrorMessages,
  aboutUsPageErrorMessages,
  productErrorMessages,
  imageUploadNewsInputsId,
  imageUploadSlideInputsId,
  valueKeys,
  inputNames,
  pocketsErrorMessages,
  closuresErrorMessages,
  basicsErrorMessages,
  strapsErrorMessages,
  constructorErrors,
  backTranslations,
  businessPageErrors,
  bottomTranslations,
  categoryErrors,
  colorsTranslations,
  contactTranslations,
  headerTranslations,
  modelTranslations,
  newsErrors,
  patternTranlations,
  homePageEditErrors,
  commentsErrors,
  slidesMessages,
  materialMessages,
  productsErrors,
  userTranslations,
  errorStatuses,
  userErrorMessages,
  materialAboutErrorMessages,
  RESET: 'reset'
};
export const inputTypes = {
  button: 'button',
  submit: 'submit'
};

export const badgePosition = {
  vertical: 'top',
  horizontal: 'right'
};

export const dateFormat = ' HH:mm DD/MM/YYYY ';
export const dateFormatOrder = ' DD.MM.YYYY ';

export const formConstants = {
  formTypeSelect: 'select',
  isRequired: '*',
  notRequired: '',
  textFieldFilled: 'filled'
};
