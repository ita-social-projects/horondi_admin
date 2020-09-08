import { getItems, setItems } from '../../utils/client';
import { config } from '../../configs';

const getAllUsersQuery = `
{
  getAllUsers {
    _id
    firstName
    lastName
    email
    role
    phoneNumber
    banned
  }
}
`;

const getUserByIdQuery = `
query($id: ID!) {
  getUserById(id: $id) {
    ... on User {
      firstName
      lastName
      email
      address {
        country
        city
        buildingNumber
        appartment
        street
        zipcode
      }
      banned
    }
  }
}
`;

const deleteUserMutation = `
mutation($id: ID!) {
  deleteUser(id: $id) {
    firstName
    lastName
  }
}
`;

const switchUserStatusMutation = `
mutation($id: ID!) {
  switchUserStatus(id: $id) {
    ... on SuccessfulResponse {
      isSuccess
    }
    ... on Error {
      message
      statusCode
    }
  }
}
`;

const registerAdminMutation = `
mutation($user: SpecialUserRegisterInput!) {
  registerAdmin(user:$user){
    ... on User {
      email
    }
    ... on Error {
      message
      statusCode
    }
  }
}
`;

const completeAdminRegisterMutation = `
mutation($user: SpecialUserConfirmInput!,$token: String!){
  completeAdminRegister(user: $user,token: $token) {
    ... on SuccessfulResponse {
    	isSuccess
    }
    ... on Error {
      message
      statusCode
    }
  }
}
`;

const validateTokenQuery = `
query($token: String!){
  validateToken(token: $token) {
    ... on SuccessfulResponse {
      isSuccess
    }
    ... on Error {
      message
      statusCode
    }
  }
}`;

const getAllUsers = async () => {
  const result = await getItems(getAllUsersQuery);

  const { data } = result;

  return data.getAllUsers;
};

const getUserById = async (id) => {
  const result = await getItems(getUserByIdQuery, { id });

  const { data } = result;

  return data.getUserById;
};

const deleteUser = async (id) => {
  const result = await setItems(deleteUserMutation, { id });

  const { data } = result;

  return data.deleteUser;
};

const switchUserStatus = async (id) => {
  const result = await setItems(switchUserStatusMutation, { id });

  const { data } = result;

  if (data.switchUserStatus.message) {
    throw new Error(
      `Помилка: ${config.errorMessages[data.switchUserStatus.message]}`
    );
  }

  return data.switchUserStatus;
};

const registerAdmin = async (user) => {
  const result = await setItems(registerAdminMutation, { user });

  const { data } = result;

  if (data.registerAdmin.message) {
    throw new Error(
      `Помилка: ${config.errorMessages[data.registerAdmin.message]}`
    );
  }

  return data.registerAdmin;
};

const completeAdminRegister = async ({ user, token }) => {
  const result = await setItems(completeAdminRegisterMutation, { user, token });

  const { data } = result;

  if (data.completeAdminRegister.message) {
    throw new Error(
      `Помилка: ${config.errorMessages[data.completeAdminRegister.message]}`
    );
  }

  return data.completeAdminRegister;
};

const validateToken = async (token) => {
  const result = await getItems(validateTokenQuery, { token });

  const { data } = result;

  if (data.validateToken.message) {
    throw new Error(
      `Помилка: ${config.errorMessages[data.validateToken.message]}`
    );
  }

  return data.validateToken;
};

export {
  getAllUsers,
  getUserById,
  deleteUser,
  switchUserStatus,
  registerAdmin,
  completeAdminRegister,
  validateToken
};
