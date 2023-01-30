import React from 'react';
import { Router } from 'react-router-dom';
import { renderHook } from '@testing-library/react-hooks';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import useDocTitleUpdate from './useDocTitleUpdate';
import { config } from '../../configs';
import configureStore from '../../store/store';

const store = configureStore();

const appWithHistory = (history, children) => (
  <Provider store={store}>
    <Router history={history}>
      <div>{children}</div>
    </Router>
  </Provider>
);

describe('useDocTitleUpdate hook test', () => {
  it('Should change the document.title to a tab value', async () => {
    const history = createMemoryHistory({ initialEntries: ['/orders'] });

    renderHook(() => useDocTitleUpdate(), {
      wrapper: ({ children }) => appWithHistory(history, children)
    });
    expect(document.title).toBe(`Horondi - ${config.menuCategories[1][0]}`);
  });

  it('Should change the document.title to a fallback value when not using tabs', () => {
    const history = createMemoryHistory({ initialEntries: ['/login'] });

    renderHook(() => useDocTitleUpdate(), {
      wrapper: ({ children }) => appWithHistory(history, children)
    });
    expect(document.title).toBe(config.app.title);
  });

  it("Should change the document.title to an error string, when a page isn't found", () => {
    const history = createMemoryHistory({ initialEntries: ['/test'] });

    renderHook(() => useDocTitleUpdate(), {
      wrapper: ({ children }) => appWithHistory(history, children)
    });
    expect(document.title).toBe(
      `Horondi - ${config.errorStatuses.ERROR_PAGE_STATUS}`
    );
  });
});
