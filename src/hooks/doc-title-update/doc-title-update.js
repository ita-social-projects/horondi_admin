import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import { matchPath } from 'react-router-dom';
import { config } from '../../configs';

const routes = Object.values(config.routes);

export const isRoutePathValid = (routePath) =>
  routes.some((route) => {
    const matchedPath = matchPath(routePath, {
      path: route,
      exact: true
    });
    return matchedPath !== null;
  });

export const setDocumentTitle = (newTitle = '') => {
  document.title = newTitle ? `Horondi - ${newTitle}` : config.app.title;
};

const useDocTitleUpdate = () => {
  const route = useLocation();
  const { errorMessage } = useSelector(({ Error }) => ({
    errorMessage: Error.error
  }));

  const { errorStatuses } = config;

  useEffect(() => {
    const currentTab = config.allCategories.find((category) =>
      category[1] !== '/'
        ? route.pathname.includes(category[1])
        : route.pathname === '/'
    );
    if (currentTab && currentTab[0]) {
      setDocumentTitle(currentTab[0]);
    } else if (isRoutePathValid(route.pathname) && !errorMessage) {
      setDocumentTitle();
    } else {
      setDocumentTitle(
        errorMessage
          ? errorStatuses.ERROR_BOUNDARY_STATUS
          : errorStatuses.ERROR_PAGE_STATUS
      );
    }
  }, [
    route,
    errorMessage,
    errorStatuses.ERROR_BOUNDARY_STATUS,
    errorStatuses.ERROR_PAGE_STATUS
  ]);
};

export default useDocTitleUpdate;
