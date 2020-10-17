import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import News from './news/news.reducer';
import Contact from './contact/contact.reducer';
import Theme from './theme/theme.reducer';
import Table from './table/table.reducer';
import Snackbar from './snackbar/snackbar.reducer';
import DialogWindow from './dialog-window/dialog-window.reducer';
import Auth from './auth/auth.reducer';
import Pattern from './pattern/pattern.reducer';
import BusinessPages from './business-pages/business-pages.reducer';
import Products from './products/products.reducer';
import Categories from './categories/categories.reducer';
import Users from './users/users.reducer';
import Comments from './comments/comments.reducer';
import EmailQuestions from './email-questions/email-questions.reducer';
import Model from './model/model.reducer';

const rootReducer = (history) =>
  combineReducers({
    Contact,
    News,
    Theme,
    Table,
    Snackbar,
    DialogWindow,
    Auth,
    router: connectRouter(history),
    Pattern,
    BusinessPages,
    Products,
    Categories,
    Users,
    EmailQuestions,
    Comments,
    Model
  });
export default rootReducer;
