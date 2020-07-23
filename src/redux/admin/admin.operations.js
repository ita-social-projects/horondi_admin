import { gql } from 'apollo-boost';
import { client } from '../../utils/client';

export const loginAdmin = async (admin) => {
  const result = await client
    .mutate({
      mutation: gql`
        mutation($user: UserInput!) {
          loginAdmin(user: $user) {
            token
            id
            role
          }
        }
      `,
      variables: { admin }
    })
    .then((res) => res);
  return result;
};
