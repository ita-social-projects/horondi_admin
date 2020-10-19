import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import CategoryIcon from '@material-ui/icons/Category';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import ImportLocationOnIcon from '@material-ui/icons/LocationOn';
import PaletteIcon from '@material-ui/icons/Palette';
import PeopleIcon from '@material-ui/icons/People';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import ListAltIcon from '@material-ui/icons/ListAlt';
import SmsIcon from '@material-ui/icons/Sms';
import StyleIcon from '@material-ui/icons/Style';
import routes from './routes';

const menuCategories = [
  ['Продукти', routes.pathToProducts, ShoppingBasketIcon],
  ['Категорії', routes.pathToCategories, CategoryIcon],
  ['Користувачі', routes.pathToUsers, PeopleIcon],
  ['Бізнес сторінки', routes.pathToBusinessPages, BusinessCenterIcon],
  ['Останні коментарі', routes.pathToComments, SmsIcon],
  ['Контакти', routes.pathToContacts, ImportLocationOnIcon],
  ['Гобелени', routes.pathToPatterns, PaletteIcon],
  ['Новини', routes.pathToNews, ImportContactsIcon],
  ['Замовлення', routes.pathToOrders, ListAltIcon],
  ['Моделі', routes.pathToModels, StyleIcon]
];
export default menuCategories;
