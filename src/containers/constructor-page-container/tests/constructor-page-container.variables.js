import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import ConstructorPageContainer from '../constructor-page-container';

import {
  getBottoms,
  deleteBottom,
  clearFilters,
  setFilter
} from '../../../redux/bottom/bottom.actions';
import { bottomSelectorWithPagination } from '../../../redux/selectors/bottom.selectors';
import { config } from '../../../configs';

const itemKey = 'bottom';

export const getTestedComponent = (store) => (
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

export const { NO_ITEMS_MESSAGE } =
  config.messages.constructorPageMessages[itemKey];

export const initialState = {
  Bottoms: {
    list: [
      {
        optionType: 'BOTTOM',
        features: {
          material: {
            _id: '6043ac5d3e06ad3edcdb7b13',
            name: [
              {
                lang: 'ua',
                value: 'Шкіра'
              },
              {
                lang: 'en',
                value: 'Leather'
              }
            ]
          },
          color: {
            _id: '6043a9cc3e06ad3edcdb7b0e',
            name: [
              {
                lang: 'ua',
                value: 'Чорний'
              },
              {
                lang: 'en',
                value: 'Black'
              }
            ]
          }
        },
        name: [
          {
            lang: 'ua',
            value: 'Шкіра чорна'
          },
          {
            lang: 'en',
            value: 'Black leather'
          }
        ],
        relativePrice: 25,
        images: {
          thumbnail: 'thumbnail_eewk311kwdxcgv1_низ-шкіра-чорна.png'
        },
        absolutePrice: null,
        available: false
      }
    ],
    bottomLoading: false,
    bottom: null,
    filter: {
      name: ''
    }
  },
  Table: {
    dense: false,
    pagination: {
      currentPage: 0,
      rowsPerPage: 10,
      rowsPerPageOptions: {
        0: 10,
        1: 20,
        3: 30
      }
    },
    itemsCount: 1
  }
};

export const editActionType = {
  type: '@@router/CALL_HISTORY_METHOD'
};

export const deleteActionType = {
  type: 'SHOW_DIALOG'
};

export const setFilterActionType = {
  type: 'SET_BOTTOM_FILTER'
};

export const clearFilterActionType = {
  type: 'CLEAR_FILTERS'
};
