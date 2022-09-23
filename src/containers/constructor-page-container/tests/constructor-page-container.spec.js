import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router';

import ConstructorPageContainer from '../constructor-page-container';
import { initialState, itemKey } from './constructor-page-container.variables';
import {
  getBottoms,
  deleteBottom,
  clearFilters,
  setFilter
} from '../../../redux/bottom/bottom.actions';
import { bottomSelectorWithPagination } from '../../../redux/selectors/bottom.selectors';

const mockStore = configureStore();
const store = mockStore(initialState);

describe('Constructor-page-containerr test', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ConstructorPageContainer
            itemKey={itemKey}
            getItemsAction={getBottoms}
            deleteItemAction={deleteBottom}
            setFilterAction={setFilter}
            clearFilterAction={clearFilters}
            itemSelectorAction={bottomSelectorWithPagination}
          />
        </MemoryRouter>
      </Provider>
    );
  });

  test('Should render table with correct data', () => {
    screen.debug();
  });
});
