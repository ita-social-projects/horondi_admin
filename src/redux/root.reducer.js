import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import History from './history/history.reducer';
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
import Sizes from './sizes/sizes.reducer';
import HomePage from './home/home.reducer';
import EmailQuestions from './email-questions/email-questions.reducer';
import { statsReducer } from './stats/stats.reducer';
import Model from './model/model.reducer';
import Header from './header/header.reducer';
import Orders from './orders/orders.reducer';
import Slides from './home-page-slides/home-page-slides.reducer';
import Error from './error/error.reducer';
import Color from './color/color.reducer';
import Constructor from './constructor/constructor.reducer';
import Back from './back/back.reducer';
import Pockets from './pockets/pockets.reducer';
import Positions from './position/position.reducer';
import Closures from './closures/closures.reducer';
import Currencies from './currencies/currencies.reducer';
import Basics from './basics/basics.reducer';

export const rootReducer = (history) =>
  combineReducers({
    Contact: contactsReducer,
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
    Sizes,
    Orders,
    Model,
    EmailQuestions,
    HomePage,
    Stats: statsReducer,
    Header,
    Slides,
    Error,
    Color,
    Constructor,
    History,
    Back,
    Pockets,
    Closures,
    Positions,
    Currencies,
    Basics
  });
