import React from 'react';
import { Router } from 'react-router-dom';
import { renderHook } from '@testing-library/react-hooks';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import useDocTitleUpdate, {
  isRoutePathValid,
  setDocumentTitle
} from './doc-title-update';
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

describe("useDocTitleUpdate hook's helpers tests", () => {
  test('setDocumentTitle sets a document title', () => {
    const newTitle = 'Test';
    setDocumentTitle(newTitle);
    expect(document.title).toBe(`Horondi - ${newTitle}`);
  });

  test("isRoutePathValid returns true for the '/orders' path", () => {
    const isPathValid = isRoutePathValid('/orders');
    expect(isPathValid).toBe(true);
  });

  test("isRoutePathValid returns false for the '/test' path", () => {
    const isPathValid = isRoutePathValid('/test');
    expect(isPathValid).toBe(false);
  });
});

describe('useDocTitleUpdate hook test', () => {
  test('Should change the document.title to a tab value', async () => {
    const history = createMemoryHistory({ initialEntries: ['/orders'] });

    renderHook(() => useDocTitleUpdate(), {
      wrapper: ({ children }) => appWithHistory(history, children)
    });
    expect(document.title).toBe(`Horondi - ${config.menuCategories[1][0]}`); // 'Замовлення'
  });

  test('Should change the document.title to a fallback value when not using tabs', () => {
    const history = createMemoryHistory({ initialEntries: ['/login'] });

    renderHook(() => useDocTitleUpdate(), {
      wrapper: ({ children }) => appWithHistory(history, children)
    });
    expect(document.title).toBe(config.app.title);
  });

  test("Should change the document.title to an error string, when a page isn't found", () => {
    const history = createMemoryHistory({ initialEntries: ['/test'] });

    renderHook(() => useDocTitleUpdate(), {
      wrapper: ({ children }) => appWithHistory(history, children)
    });
    expect(document.title).toBe(
      `Horondi - ${config.errorStatuses.ERROR_PAGE_STATUS}`
    );
  });
});
