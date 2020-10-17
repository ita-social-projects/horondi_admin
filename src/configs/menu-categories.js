import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import CategoryIcon from '@material-ui/icons/Category';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import ImportLocationOnIcon from '@material-ui/icons/LocationOn';
import PaletteIcon from '@material-ui/icons/Palette';
import PeopleIcon from '@material-ui/icons/People';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
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
  ['Запитання & Відповіді', routes.pathToEmailQuestions, LiveHelpIcon],
  ['Моделі', routes.pathToModels, StyleIcon]
];
export default menuCategories;
