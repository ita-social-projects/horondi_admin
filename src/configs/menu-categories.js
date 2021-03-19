import CategoryIcon from '@material-ui/icons/Category';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import BarChartIcon from '@material-ui/icons/BarChart';
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
import ErrorIcon from '@material-ui/icons/Error';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import LinkIcon from '@material-ui/icons/Link';
import SettingsIcon from '@material-ui/icons/Settings';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';

import routes from './routes';

export const menuCategories = [
  ['Домашня сторінка', routes.pathToMainPage, HomeIcon],
  ['Замовлення', routes.pathToOrders, ShoppingBasketIcon],
  ['Статистика', routes.pathToStatistic, BarChartIcon],
  ['Бізнес сторінки', routes.pathToAddBusinessPage, BusinessCenterIcon],
  ['Посилання', routes.pathToHeaders, LinkIcon]
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
  ['Гобелени', routes.pathToPatterns, SettingsIcon]
];

export const staticPagesCategories = [
  ['Головна сторінка', routes.pathToHomePageEdit, AssignmentIcon],
  ['Слайдер', routes.pathToHomePageSlides, FilterIcon],
  ['Новини', routes.pathToNews, ImportContactsIcon],
  ['Про оплату і доставку', routes.pathToBusinessPages, MonetizationOnIcon],
  ['Умови', routes.pathToBusinessPages, DescriptionIcon],
  ['Про нас', routes.pathToBusinessPages, InfoIcon],
  ['Про матеріали', routes.pathToBusinessPages, ExtensionIcon],
  ['Правила користування сайтом', routes.pathToBusinessPages, ErrorIcon]
];
