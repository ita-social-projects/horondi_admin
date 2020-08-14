import { gql } from 'apollo-boost';
import { client } from '../../utils/client';

const getAllUsers = async () => {
  const result = await client.query({
    query: gql`
      {
        getAllUsers {
          _id
          firstName
          lastName
          email
          phoneNumber
          banned
        }
      }
    `
  });
  const { data } = result;

  return data.getAllUsers;
};

export { getAllUsers };
