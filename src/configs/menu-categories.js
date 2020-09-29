import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import CategoryIcon from '@material-ui/icons/Category';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import ImportLocationOnIcon from '@material-ui/icons/LocationOn';
import PaletteIcon from '@material-ui/icons/Palette';
import PeopleIcon from '@material-ui/icons/People';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';

import routes from './routes';

const menuCategories = [
  ['Новини', routes.pathToNews, ImportContactsIcon],
  ['Бізнес сторінки', routes.pathToBusinessPages, BusinessCenterIcon],
  ['Контакти', routes.pathToContacts, ImportLocationOnIcon],
  ['Категорії', routes.pathToCategories, CategoryIcon],
  ['Продукти', routes.pathToProducts, ShoppingBasketIcon],
  ['Користувачі', routes.pathToUsers, PeopleIcon],
  ['Гобелени', routes.pathToPatterns, PaletteIcon]
];
export default menuCategories;
