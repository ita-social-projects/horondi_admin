import { gql } from '@apollo/client';
import { client } from '../../utils/client';

import { homePageEditTranslations } from '../../translations/home-page-edit.translations';
import { getFromLocalStorage } from '../../services/local-storage.service';

const token = getFromLocalStorage('HORONDI_AUTH_TOKEN');

const getHomePageLooksImages = async () => {
  const result = await client.query({
    query: gql`
      query {
        getHomePageLooksImages {
          _id
          images {
            small
          }
        }
      }
    `
  });
  client.resetStore();

  const { getHomePageLooksImages } = result.data;
  return getHomePageLooksImages;
};

// const addHomePageLooksImages = async (newImages) => {
//   const result = await client.mutate({
//     variables: { newImages },
//     context: { headers: { token } },
//     mutation: gql`
//       mutation($newImages: Upload!) {
//         addImage(newImages: $newImages) {
//           _id
//           small
//         }
//       }
//     `,
//     fetchPolicy: 'no-cache'
//   });
//   client.resetStore();

//   const { data } = result;

//   if (data.addImage.message) {
//     throw new Error(
//       `${data.addImage.statusCode} ${
//         homePageEditTranslations[data.addImage.message]
//       }`
//     );
//   }

//   return data.addImage;
// };

const updateHomePageLooksImage = async (id, updatedImage) => {
  console.log('FROM OPERATIONS', id, updatedImage);
  const result = await client.mutate({
    variables: {
      id,
      updatedImage
    },
    context: { headers: { token } },
    mutation: gql`
      mutation($id: [ID!], $updatedImage: Upload) {
        updateHomePageLooksImage(id: $id, images: $updatedImage) {
          images {
            small
          }
        }
      }
    `,
    fetchPolicy: 'no-cache'
  });
  client.resetStore();

  const { data } = result;

  if (data.updateHomePageLooksImage.message) {
    throw new Error(
      `${data.updateHomePageLooksImage.statusCode} ${
        homePageEditTranslations[data.updateHomePageLooksImage.message]
      }`
    );
  }

  return data.updateHomePageLooksImage;
};

// const deleteHomePageLooksImage = async (id) => {
//   const result = await client.mutate({
//     variables: { id },
//     context: { headers: { token } },
//     mutation: gql`
//       mutation($id: ID!) {
//         deleteHomePageLooksImage(id: $id) {
//           _id
//         }
//       }
//     `,
//     fetchPolicy: 'no-cache'
//   });
//   client.resetStore();

//   const { data } = result;

//   if (data.deleteHomePageLooksImage.message) {
//     throw new Error(
//       `${data.deleteHomePageLooksImage.statusCode} ${
//         homePageEditTranslations[data.deleteHomePageLooksImage.message]
//       }`
//     );
//   }

//   return data.deleteHomePageLooksImage;
// };

export {
  getHomePageLooksImages,
  // addHomePageLooksImages,
  updateHomePageLooksImage
  // deleteHomePageLooksImage
};
