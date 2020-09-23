import { getItems, setItems } from '../../utils/client';
import { config } from '../../configs';

const getAllUsersQuery = `
query($filter: UserFilterInput) {
  getAllUsers(filter: $filter) {
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
mutation($user: AdminRegisterInput!) {
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
mutation($user: AdminConfirmInput!,$token: String!){
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
  validateConfirmationToken(token: $token) {
    ... on SuccessfulResponse {
      isSuccess
    }
    ... on Error {
      message
      statusCode
    }
  }
}`;

const getAllUsers = async (options = {}) => {
  const { filter } = options;

  const result = await getItems(getAllUsersQuery, { filter });

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

  console.log(data);

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

  if (data.validateConfirmationToken.message) {
    throw new Error(
      `Помилка: ${config.errorMessages[data.validateConfirmationToken.message]}`
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
