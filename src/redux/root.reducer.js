import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import News from './news/news.reducer';
import Theme from './theme/theme.reducer';
import Table from './table/table.reducer';
import Snackbar from './snackbar/snackbar.reducer';
import DialogWindow from './dialog-window/dialog-window.reducer';
import Auth from './auth/auth.reducer';
import BusinessPages from './businessPages/businessPages.reducer';

const rootReducer = (history) =>
  combineReducers({
    News,
    Theme,
    Table,
    Snackbar,
    DialogWindow,
    Auth,
    BusinessPages,
    router: connectRouter(history)
  });
export default rootReducer;
