import { combineReducers } from 'redux';
import News from './news/news.reducer';
import Theme from './theme/theme.reducer';
import Table from './table/table.reducer';
import Pagination from './pagination/pagination.reducer';
import App from './app/app.reducer';

const rootReducer = combineReducers({
  News,
  Theme,
  Table,
  Pagination,
  App
});
export default rootReducer;
