import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import News from './news/news.reducer';
import { contactsReducer } from './contact/contact.reducer';
import Theme from './theme/theme.reducer';
import Table from './table/table.reducer';
import Snackbar from './snackbar/snackbar.reducer';
import DialogWindow from './dialog-window/dialog-window.reducer';
import Auth from './auth/auth.reducer';
import Material from './material/material.reducer';
import Pattern from './pattern/pattern.reducer';
import BusinessPages from './business-pages/business-pages.reducer';
import Products from './products/products.reducer';
import Categories from './categories/categories.reducer';
import Users from './users/users.reducer';
import Comments from './comments/comments.reducer';
import HomePage from './home/home.reducer';
import EmailQuestions from './email-questions/email-questions.reducer';
import { statsReducer } from './stats/stats.reducer';
import Model from './model/model.reducer';
import Header from './header/header.reducer';
import Orders from './orders/orders.reducer';
import Slides from './home-page-slides/home-page-slides.reducer';
import Error from './error/error.reducer';

export const rootReducer = (history) =>
  combineReducers({
    contactsReducer,
    News,
    Theme,
    Table,
    Snackbar,
    DialogWindow,
    Auth,
    router: connectRouter(history),
    Material,
    Pattern,
    BusinessPages,
    Products,
    Categories,
    Users,
    Comments,
    Orders,
    Model,
    EmailQuestions,
    HomePage,
    statsReducer,
    Header,
    Slides,
    Error
  });
