import { combineReducers } from 'redux';

import paginationState from './Paginator-reducer';
import filtersState from './Filters-reducer';
import searchState from './Search-reducer';
import tableState from './Table-reducer';
import themeState from './Theme-reducer';
import dialogWindowState from './Dialog-window-reducer';
import snackbarState from './Snackbar-reducer';
import newsState from './News-reducer';

export default combineReducers({
  paginationState,
  filtersState,
  searchState,
  tableState,
  themeState,
  dialogWindowState,
  snackbarState,
  newsState
});
