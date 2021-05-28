import { getItems, setItems } from '../../utils/client';
import { userTranslations } from '../../translations/user.translations';

export const getUserByToken = async () => {
  const getUserByTokenQuery = `
      query {
        getUserByToken {
          ... on User {
            _id
            email
          }
        }
      }
    `;

  const result = await getItems(getUserByTokenQuery);

  return result?.data?.getUserByToken;
};

export const loginAdmin = async (loginInput) => {
  const loginAdminMutation = `
      mutation($loginInput: LoginInput!) {
        loginAdmin(loginInput: $loginInput) {
          _id
          token
          refreshToken
        }
      }
    `;

  const result = await setItems(loginAdminMutation, { loginInput });

  if (
    Object.keys(userTranslations).includes(result?.data?.loginAdmin?.message)
  ) {
    throw new Error(`${userTranslations[result.data.loginAdmin.message]}`);
  }

  return result?.data?.loginAdmin;
};
export const regenerateAuthTokenPair = async (refreshToken) => {
  const regenerateAuthTokenPairMutation = `
      mutation($refreshToken:String!) {
        regenerateAccessToken(refreshToken:$refreshToken) {
          ... on Token {
            token
            refreshToken
          }
        }
      }
    `;

  const result = await setItems(regenerateAuthTokenPairMutation, {
    refreshToken
  });

  return result?.data?.regenerateAccessToken;
};
