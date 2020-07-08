import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import News from './news/news.reducer';
import Theme from './theme/theme.reducer';
import Table from './table/table.reducer';
import Pagination from './pagination/pagination.reducer';
import App from './app/app.reducer';
import Snackbar from './snackbar/snackbar.reducer';

const rootReducer = (history) =>
  combineReducers({
    News,
    Theme,
    Table,
    Pagination,
    App,
    Snackbar,
    router: connectRouter(history)
  });
export default rootReducer;
