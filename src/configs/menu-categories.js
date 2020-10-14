import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import CategoryIcon from '@material-ui/icons/Category';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import ImportLocationOnIcon from '@material-ui/icons/LocationOn';
import PaletteIcon from '@material-ui/icons/Palette';
import PeopleIcon from '@material-ui/icons/People';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import SmsIcon from '@material-ui/icons/Sms';
import ImageRoundedIcon from '@material-ui/icons/ImageRounded';
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
  ['Головна сторінка', routes.pathToHomePageEdit, ImageRoundedIcon]
];
export default menuCategories;
