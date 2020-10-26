export const clearLocalStorage = () => {
  const horondiAdmin = {
    HORONDI_AUTH_TOKEN: '',
    darkMode: null
  };
  localStorage.setItem('horondiAdmin', JSON.stringify(horondiAdmin));
};

if (!localStorage.getItem('horondiAdmin')) {
  clearLocalStorage();
}

export const getFromLocalStorage = (name) => {
  const localObject = JSON.parse(localStorage.getItem('horondiAdmin'));
  return localObject[name];
};

export const setToLocalStorage = (name, item) => {
  const localObject = JSON.parse(localStorage.getItem('horondiAdmin'));
  localObject[name] = item;
  localStorage.setItem('horondiAdmin', JSON.stringify(localObject));
};
