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
    banned{
      blockPeriod
      blockCount
      updatedAt
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
      confirmed
      email
      address {
        country
        city
        buildingNumber
        appartment
        street
        zipcode
      }
     banned{
      blockPeriod
      blockCount
      updatedAt
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

const confirmSuperadminCreationMutation = `
mutation($user: confirmSuperadminCreationInput!) {
  confirmSuperadminCreation(user:$user){
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

const blockUserMutation = `
  mutation($userId:ID!){
    blockUser(userId:$userId){
      ...on User{
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
        banned{
          blockPeriod
          blockCount
          updatedAt
        }
      }
         ...on Error {
        message
        statusCode
      }
    }
  }
`;
const unlockUserMutation = `
  mutation($userId:ID!){
    unlockUser(userId:$userId){
      ...on User{
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
        banned{
          blockPeriod
          blockCount
          updatedAt
        }
      }
      ...on Error {
        message
        statusCode
      }
    }
  }
`;

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

const blockUser = async (userId) => {
  const result = await setItems(blockUserMutation, { userId });
  const { data } = result;

  if (data.blockUser.message) {
    throw new Error(`Помилка: ${config.errorMessages[data.blockUser.message]}`);
  }

  return data.blockUser;
};
const unlockUser = async (userId) => {
  const result = await setItems(unlockUserMutation, { userId });
  const { data } = result;

  if (data.unlockUser.message) {
    throw new Error(
      `Помилка: ${config.errorMessages[data.unlockUser.message]}`
    );
  }

  return data.unlockUser;
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

  return data.registerAdmin;
};

const confirmSuperadminCreation = async (user) => {
  const result = await setItems(confirmSuperadminCreationMutation, { user });

  const { data } = result;

  if (data.confirmSuperadminCreation.message) {
    throw new Error(
      `Помилка: ${config.errorMessages[data.resendEmailToConfirmAdmin.message]}`
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
  registerAdmin,
  resendEmailToConfirmAdmin,
  completeAdminRegister,
  validateToken,
  blockUser,
  unlockUser,
  confirmSuperadminCreation
};
