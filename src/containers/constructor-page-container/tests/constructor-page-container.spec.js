import { render, screen, act, fireEvent } from '@testing-library/react';
import * as redux from 'react-redux';
import configureStore from 'redux-mock-store';

import {
  initialState,
  getTestedComponent,
  NO_ITEMS_MESSAGE,
  editActionType,
  deleteActionType,
  setFilterActionType,
  clearFilterActionType
} from './constructor-page-container.variables';

const mockStore = configureStore();

const useDispatchSpy = jest.spyOn(redux, 'useDispatch');
const mockDispatchFn = jest.fn();
useDispatchSpy.mockReturnValue(mockDispatchFn);

let state;

describe('Constructor-page-container test', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Should render table with constructor-items', () => {
    state = initialState;
    const store = mockStore(state);

    render(getTestedComponent(store));

    const tableRows = screen.getAllByRole('row');
    expect(tableRows).toHaveLength(2);
  });

  test('Filter-bar should work', async () => {
    state = initialState;
    const store = mockStore(state);

    render(getTestedComponent(store));

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'abc' } });

    const searcBtn = screen.getByTestId('search');
    act(() => {
      fireEvent.click(searcBtn);
    });

    expect(mockDispatchFn).toHaveBeenLastCalledWith(
      expect.objectContaining(setFilterActionType)
    );

    const clearBtn = screen.getByTestId('clear-filters');
    act(() => {
      fireEvent.click(clearBtn);
    });

    expect(mockDispatchFn).toHaveBeenLastCalledWith(
      expect.objectContaining(clearFilterActionType)
    );
  });

  test('Edit button should work', () => {
    state = initialState;
    const store = mockStore(state);

    render(getTestedComponent(store));

    const editBtn = screen.getByTestId('edit_btn');
    act(() => {
      fireEvent.click(editBtn);
    });

    expect(mockDispatchFn).toHaveBeenLastCalledWith(
      expect.objectContaining(editActionType)
    );
  });

  test('Delete button should work', () => {
    state = {
      ...initialState,
      Constructor: {
        ...initialState.Constructor,
        list: []
      }
    };
    const store = mockStore(state);

    render(getTestedComponent(store));

    const deleteBtn = screen.getByTestId('del_btn');
    act(() => {
      fireEvent.click(deleteBtn);
    });

    expect(mockDispatchFn).toHaveBeenLastCalledWith(
      expect.objectContaining(deleteActionType)
    );
  });

  test('Delete button should prevent deletion item', () => {
    state = initialState;
    const store = mockStore(state);

    render(getTestedComponent(store));

    const deleteBtn = screen.getByTestId('del_btn');
    act(() => {
      fireEvent.click(deleteBtn);
    });

    expect(mockDispatchFn).toHaveBeenLastCalledWith(
      expect.objectContaining(deleteActionType)
    );
  });

  test('Should render LoadingBar', () => {
    state = {
      ...initialState,
      Bottoms: {
        ...initialState.Bottoms,
        bottomLoading: true
      }
    };
    const store = mockStore(state);

    render(getTestedComponent(store));

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  test('Should render no items message', () => {
    state = {
      ...initialState,
      Bottoms: {
        ...initialState.Bottoms,
        list: []
      }
    };
    const store = mockStore(state);

    render(getTestedComponent(store));

    expect(screen.getByText(NO_ITEMS_MESSAGE)).toBeInTheDocument();
  });
});
