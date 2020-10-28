import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import CategoryIcon from '@material-ui/icons/Category';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import ImportLocationOnIcon from '@material-ui/icons/LocationOn';
import PaletteIcon from '@material-ui/icons/Palette';
import PeopleIcon from '@material-ui/icons/People';
import ListAltIcon from '@material-ui/icons/ListAlt';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import SmsIcon from '@material-ui/icons/Sms';
import ImageRoundedIcon from '@material-ui/icons/ImageRounded';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import BarChartIcon from '@material-ui/icons/BarChart';
import StyleIcon from '@material-ui/icons/Style';
import routes from './routes';

const menuCategories = [
  ['Статистика', routes.pathToStatistic, BarChartIcon],
  ['Продукти', routes.pathToProducts, ShoppingCart],
  ['Категорії', routes.pathToCategories, CategoryIcon],
  ['Користувачі', routes.pathToUsers, PeopleIcon],
  ['Бізнес сторінки', routes.pathToBusinessPages, BusinessCenterIcon],
  ['Останні коментарі', routes.pathToComments, SmsIcon],
  ['Контакти', routes.pathToContacts, ImportLocationOnIcon],
  ['Гобелени', routes.pathToPatterns, PaletteIcon],
  ['Матеріали', routes.pathToMaterials, LocalMallIcon],
  ['Новини', routes.pathToNews, ImportContactsIcon],
  ['Запитання покупців', routes.pathToEmailQuestions, LiveHelpIcon],
  ['Моделі', routes.pathToModels, StyleIcon],
  ['Замовлення', routes.pathToOrders, ListAltIcon]
  ['Головна сторінка', routes.pathToHomePageEdit, ImageRoundedIcon]
];
export default menuCategories;
