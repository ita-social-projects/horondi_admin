import { SHOW_LOADER, HIDE_LOADER } from './app.types';

const showLoader = () => ({
  type: SHOW_LOADER
});

const hideLoader = () => ({
  type: HIDE_LOADER
});

export { showLoader, hideLoader };
