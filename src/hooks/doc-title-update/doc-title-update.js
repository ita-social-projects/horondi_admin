import { useCallback, useEffect } from 'react';
import { useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import { matchPath } from 'react-router-dom';
import { config } from '../../configs';

const routes = Object.values(config.routes);

const useDocTitleUpdate = () => {
  const currentRoute = useLocation();
  const { errorMessage } = useSelector(({ Error }) => ({
    errorMessage: Error.error
  }));
  const { errorStatuses } = config;

  const isRoutePathValid = useCallback(
    (routePath) =>
      routes.some((route) => {
        const matchedPath = matchPath(routePath, {
          path: route,
          exact: true
        });
        return matchedPath !== null;
      }),
    []
  );

  const setDocumentTitle = useCallback((newTitle = '') => {
    document.title = newTitle ? `Horondi - ${newTitle}` : config.app.title;
  }, []);

  useEffect(() => {
    const currentTab = config.allCategories.find((category) => {
      const categoryRoutePath = category[1];
      return categoryRoutePath !== '/'
        ? currentRoute.pathname.includes(categoryRoutePath)
        : currentRoute.pathname === '/';
    });

    if (currentTab && currentTab[0]) {
      setDocumentTitle(currentTab[0]);
    } else if (isRoutePathValid(currentRoute.pathname) && !errorMessage) {
      setDocumentTitle();
    } else {
      setDocumentTitle(
        errorMessage
          ? errorStatuses.ERROR_BOUNDARY_STATUS
          : errorStatuses.ERROR_PAGE_STATUS
      );
    }
  }, [
    currentRoute,
    errorMessage,
    errorStatuses.ERROR_BOUNDARY_STATUS,
    errorStatuses.ERROR_PAGE_STATUS,
    isRoutePathValid,
    setDocumentTitle
  ]);
};

export default useDocTitleUpdate;
