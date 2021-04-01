import { getItems, setItems } from '../../utils/client';
import { config } from '../../configs';

const getAllUsersQuery = `
query(
  $filter: UserFilterInput
  $pagination: Pagination
  $sort: UserSortInput
) {
  getAllUsers(
  filter: $filter
  pagination: $pagination
  sort: $sort
  ) {
  items {
    _id
    firstName
    lastName
    email
    role
    phoneNumber
    confirmed
    banned {
      blockPeriod, blockCount, updatedAt
    }
    }
    count
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
      role
      confirmed
      address {
        country
        city
        buildingNumber
        appartment
        street
        zipcode
      }
      banned{
      blockPeriod, blockCount, updatedAt
    }
    }
  }
}
`;

const deleteUserMutation = `
mutation($id: ID!) {
  deleteUser(id: $id) {
   ... on User {
    firstName
    lastName
    }
    ... on Error {
    message
    statusCode
    }
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

const resendEmailToConfirmAdminMutation = `
mutation($user: resendEmailToConfirmAdminInput!) {
  resendEmailToConfirmAdmin(user:$user){
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

const getAllUsers = async (filter, pagination, sort) => {
  const options = {
    filter,
    pagination,
    sort
  };

  const result = await getItems(getAllUsersQuery, options);

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

  if (data.deleteUser.message) {
    throw new Error(
      `Помилка: ${config.errorMessages[data.deleteUser.message]}`
    );
  }

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

const resendEmailToConfirmAdmin = async (user) => {
  const result = await setItems(resendEmailToConfirmAdminMutation, { user });

  const { data } = result;

  if (data.resendEmailToConfirmAdmin.message) {
    throw new Error(
      `Помилка: ${config.errorMessages[data.resendEmailToConfirmAdmin.message]}`
    );
  }

  return data.resendEmailToConfirmAdmin;
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
  resendEmailToConfirmAdmin,
  completeAdminRegister,
  validateToken
};
