import { LOCAL_STORAGE } from '../consts/local-storage';

export const clearLocalStorage = () => {
  const horondiAdmin = {
    auth_access_token: null,
    auth_refresh_token: null,
    darkMode: null
  };
  localStorage.setItem(
    LOCAL_STORAGE.HORONDI_ADMIN,
    JSON.stringify(horondiAdmin)
  );
};

if (!localStorage.getItem(LOCAL_STORAGE.HORONDI_ADMIN)) {
  clearLocalStorage();
}

export const getFromLocalStorage = (name) => {
  const localObject = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE.HORONDI_ADMIN)
  );
  return localObject[name];
};

export const setToLocalStorage = (name, item) => {
  const localObject = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE.HORONDI_ADMIN)
  );
  localObject[name] = item;
  localStorage.setItem(
    LOCAL_STORAGE.HORONDI_ADMIN,
    JSON.stringify(localObject)
  );
};
