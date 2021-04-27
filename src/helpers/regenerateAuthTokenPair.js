import { createBrowserHistory } from 'history';
import {
  getFromLocalStorage,
  setToLocalStorage
} from '../services/local-storage.service';
import { LOCAL_STORAGE } from '../consts/local-storage';
import { regenerateAuthTokenPair } from '../redux/auth/auth.operations';
import { AUTH_ERRORS } from '../error-messages/auth';

export const history = createBrowserHistory();

const refreshAuthToken = async () => {
  let isRegenerateTokens = false;

  const refreshToken = getFromLocalStorage(LOCAL_STORAGE.AUTH_REFRESH_TOKEN);

  const newTokenPair = await regenerateAuthTokenPair(refreshToken);

  if (newTokenPair?.message === AUTH_ERRORS.REFRESH_TOKEN_IS_NOT_VALID) {
    return isRegenerateTokens;
  } 
  setToLocalStorage(LOCAL_STORAGE.AUTH_ACCESS_TOKEN, newTokenPair.token);
  setToLocalStorage(
    LOCAL_STORAGE.AUTH_REFRESH_TOKEN,
    newTokenPair.refreshToken
  );

  isRegenerateTokens = true;

  return isRegenerateTokens;
  
};

export default refreshAuthToken;
