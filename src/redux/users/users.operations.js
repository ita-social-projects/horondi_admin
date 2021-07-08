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

  const result = await getItems(getAllUsersQuery, {
    filter,
    pagination,
    sort
  });

  return result?.data?.getAllUsers;
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

  const result = await getItems(getUserByIdQuery, { id });

  return result?.data?.getUserById;
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

  const result = await setItems(deleteUserMutation, { id });

  if (
    Object.keys(config.errorMessages).includes(
      result?.data?.deleteUser?.message
    )
  ) {
    throw new Error(
      `Помилка: ${config.errorMessages[result.data.deleteUser.message]}`
    );
  }

  return result?.data?.deleteUser;
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

  const result = await setItems(blockUserMutation, { userId });

  if (
    Object.keys(config.errorMessages).includes(result?.data?.blockUser?.message)
  ) {
    throw new Error(
      `Помилка: ${config.errorMessages[result?.data?.blockUser.message]}`
    );
  }

  return result?.data?.blockUser;
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

  const result = await setItems(unlockUserMutation, { userId });

  if (
    Object.keys(config.errorMessages).includes(
      result?.data?.unlockUser?.message
    )
  ) {
    throw new Error(
      `Помилка: ${config.errorMessages[result.data.unlockUser.message]}`
    );
  }

  return result?.data?.unlockUser;
};
const registerAdmin = async (user) => {
  const registerAdminMutation = `
mutation($user: AdminRegisterInput!) {
  registerAdmin(user:$user){
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

  const result = await setItems(registerAdminMutation, { user });

  if (
    Object.keys(config.errorMessages).includes(
      result?.data?.registerAdmin?.message
    )
  ) {
    throw new Error(
      `Помилка: ${config.errorMessages[result.data.registerAdmin.message]}`
    );
  }

  return result?.data?.registerAdmin;
};
const resendEmailToConfirmAdmin = async (user) => {
  const resendEmailToConfirmAdminMutation = `
mutation($user: resendEmailToConfirmAdminInput!) {
  resendEmailToConfirmAdmin(user:$user){
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

  const result = await setItems(resendEmailToConfirmAdminMutation, { user });

  if (
    Object.keys(config.errorMessages).includes(
      result?.data?.resendEmailToConfirmAdmin?.message
    )
  ) {
    throw new Error(
      `Помилка: ${
        config.errorMessages[result.data.resendEmailToConfirmAdmin.message]
      }`
    );
  }

  return result?.data?.resendEmailToConfirmAdmin;
};
const confirmSuperadminCreation = async (user) => {
  const confirmSuperadminCreationMutation = `
    mutation($user: confirmSuperadminCreationInput!) {
      confirmSuperadminCreation(user:$user){
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

  const result = await setItems(confirmSuperadminCreationMutation, { user });

  if (
    Object.keys(config.errorMessages).includes(
      result?.data?.confirmSuperadminCreation?.message
    )
  ) {
    throw new Error(
      `Помилка: ${
        config.errorMessages[result.data.confirmSuperadminCreation.message]
      }`
    );
  }

  return result?.data?.confirmSuperadminCreation;
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

  const result = await setItems(completeAdminRegisterMutation, {
    user,
    token
  });

  if (
    Object.keys(config.errorMessages).includes(
      result?.data?.completeAdminRegister?.message
    )
  ) {
    throw new Error(
      `Помилка: ${
        config.errorMessages[result.data.completeAdminRegister.message]
      }`
    );
  }

  return result?.data?.completeAdminRegister;
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

  const result = await getItems(validateTokenQuery, { token });

  if (
    Object.keys(config.errorMessages).includes(
      result?.data?.validateConfirmationToken?.message
    )
  ) {
    throw new Error(
      `Помилка: ${
        config.errorMessages[result.data.validateConfirmationToken.message]
      }`
    );
  }

  return result?.data?.validateConfirmationToken;
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
