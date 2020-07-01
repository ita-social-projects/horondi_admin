import { combineReducers } from 'redux';
import News from './news/news.reducer';
import Theme from './theme/theme.reducer';

const rootReducer = combineReducers({
  News,
  Theme
});
export default rootReducer;
