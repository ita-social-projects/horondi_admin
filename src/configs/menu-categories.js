import CategoryIcon from '@material-ui/icons/Category';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import BarChartIcon from '@material-ui/icons/BarChart';
import HistoryIcon from '@material-ui/icons/History';
import StyleIcon from '@material-ui/icons/Style';
import FilterIcon from '@material-ui/icons/Filter';
import HomeIcon from '@material-ui/icons/Home';
import LineWeight from '@material-ui/icons/LineWeight';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import HelpIcon from '@material-ui/icons/Help';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import DescriptionIcon from '@material-ui/icons/Description';
import InfoIcon from '@material-ui/icons/Info';
import ExtensionIcon from '@material-ui/icons/Extension';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import GradientIcon from '@material-ui/icons/Gradient';
import ImportLocationOnIcon from '@material-ui/icons/LocationOn';
import ViewDayIcon from '@material-ui/icons/ViewDay';
import ViewHeadlineIcon from '@material-ui/icons/ViewHeadline';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import GetAppIcon from '@material-ui/icons/GetApp';
import PanoramaVerticalIcon from '@material-ui/icons/PanoramaVertical';
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import MyLocationIcon from '@material-ui/icons/MyLocation';
import PeopleIcon from '@material-ui/icons/People';

import routes from './routes';
import { PromoIcon } from '../components/nav-bar/icons';

export const menuCategories = [
  ['Домашня сторінка', routes.pathToMainPage, HomeIcon],
  ['Замовлення', routes.pathToOrders, ShoppingBasketIcon],
  ['Статистика', routes.pathToStatistic, BarChartIcon],
  ['Останні зміни', routes.pathToHistory, HistoryIcon],
  ['Про Нас', routes.pathToAboutUs, PeopleIcon]
];

export const materialMenuCategories = [
  ['Матеріали', routes.pathToAboutMaterialsMain, ExtensionIcon],
  ['Матеріали низу', routes.pathToAboutMaterialsBottom, ExtensionIcon]
];

export const clientMenuCategories = [
  ['Користувачі', routes.pathToUsers, AccountCircleIcon],
  ['Коментарі', routes.pathToComments, FormatListBulletedIcon],
  ['Запитання покупців', routes.pathToEmailQuestions, HelpIcon]
];

export const catalogMenuCategories = [
  ['Категорії', routes.pathToCategories, CategoryIcon],
  ['Моделі', routes.pathToModels, StyleIcon],
  ['Продукти', routes.pathToProducts, LocalMallIcon],
  ['Розміри', routes.pathToSizes, LineWeight],
  ['Матеріали', routes.pathToMaterials, LocalMallIcon],
  ['Гобелени', routes.pathToPatterns, GradientIcon]
];
export const promoMenuCategories = [
  ['Інформація про промокоди', routes.pathToPromoCodes, PromoIcon]
];

export const staticPagesCategories = [
  ['Головна сторінка', routes.pathToHomePageEdit, AssignmentIcon],
  ['Слайдер', routes.pathToHomePageSlides, FilterIcon],
  ['Новини', routes.pathToNews, ImportContactsIcon],
  ['Контакти', routes.pathToContacts, ImportLocationOnIcon],
  [
    'Про оплату і доставку',
    routes.pathToBusinessPagePaymentAndShipping,
    MonetizationOnIcon
  ],
  ['Умови', routes.pathToBusinessPagePrivacyPolicy, DescriptionIcon],
  [
    'Угода користувача',
    routes.pathToBusinessPageUserAgreement,
    DescriptionIcon
  ],
  ['Правила користування сайтом', routes.pathToBusinessPageTerms, InfoIcon],
  ['Питання та відповіді', routes.pathToBusinessPages, HelpIcon]
];

export const constructorMenuCategories = [
  ['Список конструкторів', routes.pathToConstructorList, ViewHeadlineIcon],
  ['Низ', routes.pathToBottoms, GetAppIcon],
  ['Основа', routes.pathToBasics, ViewDayIcon],
  ['Кишені', routes.pathToPockets, SwapHorizIcon],
  ['Позиція', routes.pathToPosition, MyLocationIcon],
  ['Спинка', routes.pathToBacks, PanoramaVerticalIcon],
  ['Ремінці', routes.pathToStraps, ConfirmationNumberIcon],
  ['Защіпки', routes.pathToClosures, AllInclusiveIcon]
];

export const certificatesMenuCategories = [
  ['Створити сертифікат', routes.pathToCreateCertificates, AccountCircleIcon],
  [
    'Інформація про сертифікати',
    routes.pathToAboutCertificate,
    AccountCircleIcon
  ]
];
