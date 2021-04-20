import { getItems, setItems } from '../../utils/client';

const loginAdminMutation = `
      mutation($loginInput: LoginInput!) {
        loginAdmin(loginInput: $loginInput) {
          _id
          token
          refreshToken
        }
      }
    `;
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

export const getUserByToken = async () => {
  const { data } = await getItems(getUserByTokenQuery);

  return data.getUserByToken;
};
export const loginAdmin = async (loginInput) => {
  const { data } = await setItems(loginAdminMutation, { loginInput });

  return data.loginAdmin;
};
export const regenerateAuthTokenPair = async (refreshToken) => {
  const { data } = await setItems(regenerateAuthTokenPairMutation, {
    refreshToken
  });

  return data.regenerateAccessToken;
};
