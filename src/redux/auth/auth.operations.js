import {getItems, setItems} from '../../utils/client';

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

    const {data} = await getItems(getUserByTokenQuery);

    return data.getUserByToken;
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
    const {data} = await setItems(loginAdminMutation, {loginInput});

    return data.loginAdmin;
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

    const {data} = await setItems(regenerateAuthTokenPairMutation, {
        refreshToken
    });

    return data.regenerateAccessToken;
};
