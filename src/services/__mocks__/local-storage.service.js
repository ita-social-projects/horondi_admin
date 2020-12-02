const mocked = {
  HORONDI_AUTH_TOKEN: '1111bGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'
};

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

export const getFromLocalStorage = (name) => mocked[name];

export const setToLocalStorage = (name, item) => {
  const localObject = JSON.parse(localStorage.getItem('horondiAdmin'));
  localObject[name] = item;
  localStorage.setItem('horondiAdmin', JSON.stringify(localObject));
};
