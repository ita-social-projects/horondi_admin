import { getItems, setItems } from '../../utils/client';
import { config } from '../../configs';

const getAllUsers = async (filter, pagination, sort) => {
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

  const { data } = await getItems(getAllUsersQuery, {
    filter,
    pagination,
    sort
  });

  return data.getAllUsers;
};
const getUserById = async (id) => {
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

  const { data } = await getItems(getUserByIdQuery, { id });

  return data.getUserById;
};
const deleteUser = async (id) => {
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

  const { data } = await setItems(deleteUserMutation, { id });

  if (Object.keys(config.errorMessages).includes(data.deleteUser?.message)) {
    throw new Error(
      `Помилка: ${config.errorMessages[data.deleteUser.message]}`
    );
  }

  return data.deleteUser;
};
const blockUser = async (userId) => {
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

  const { data } = await setItems(blockUserMutation, { userId });

  if (Object.keys(config.errorMessages).includes(data.blockUser?.message)) {
    throw new Error(`Помилка: ${config.errorMessages[data.blockUser.message]}`);
  }

  return data.blockUser;
};
const unlockUser = async (userId) => {
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

  const { data } = await setItems(unlockUserMutation, { userId });

  if (Object.keys(config.errorMessages).includes(data.unlockUser?.message)) {
    throw new Error(
      `Помилка: ${config.errorMessages[data.unlockUser.message]}`
    );
  }

  return data.unlockUser;
};
const registerAdmin = async (user) => {
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

  const { data } = await setItems(registerAdminMutation, { user });

  if (Object.keys(config.errorMessages).includes(data.registerAdmin?.message)) {
    throw new Error(
      `Помилка: ${config.errorMessages[data.registerAdmin.message]}`
    );
  }

  return data.registerAdmin;
};
const resendEmailToConfirmAdmin = async (user) => {
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

  const { data } = await setItems(resendEmailToConfirmAdminMutation, { user });

  if (
    Object.keys(config.errorMessages).includes(
      data.resendEmailToConfirmAdmin?.message
    )
  ) {
    throw new Error(
      `Помилка: ${config.errorMessages[data.resendEmailToConfirmAdmin.message]}`
    );
  }

  return data.registerAdmin;
};
const confirmSuperadminCreation = async (user) => {
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

  const { data } = await setItems(confirmSuperadminCreationMutation, { user });

  if (
    Object.keys(config.errorMessages).includes(
      data.confirmSuperadminCreation?.message
    )
  ) {
    throw new Error(
      `Помилка: ${config.errorMessages[data.resendEmailToConfirmAdmin.message]}`
    );
  }

  return data.registerAdmin;
};
const completeAdminRegister = async ({ user, token }) => {
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

  const { data } = await setItems(completeAdminRegisterMutation, {
    user,
    token
  });

  if (
    Object.keys(config.errorMessages).includes(
      data.completeAdminRegister?.message
    )
  ) {
    throw new Error(
      `Помилка: ${config.errorMessages[data.completeAdminRegister.message]}`
    );
  }

  return data.completeAdminRegister;
};
const validateToken = async (token) => {
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

  const { data } = await getItems(validateTokenQuery, { token });

  if (
    Object.keys(config.errorMessages).includes(
      data.validateConfirmationToken?.message
    )
  ) {
    throw new Error(
      `Помилка: ${config.errorMessages[data.validateConfirmationToken.message]}`
    );
  }

  return data.validateConfirmationToken;
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
