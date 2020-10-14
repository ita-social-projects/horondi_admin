import { gql } from '@apollo/client';
import { client } from '../../utils/client';

import { homePageEditTranslations } from '../../translations/home-page-edit.translations';
import { getFromLocalStorage } from '../../services/local-storage.service';

const token = getFromLocalStorage('HORONDI_AUTH_TOKEN');

const getHomePageLooksImages = async () => {
  const result = await client.query({
    query: gql`
      query {
        getAllImages {
          small
        }
      }
    `
  });
  client.resetStore();

  const { getAllImages } = result.data;
  return getAllImages;
};

const addHomePageLooksImages = async (newImages) => {
  const result = await client.mutate({
    variables: { newImages },
    context: { headers: { token } },
    mutation: gql`
      mutation($newImages: Upload!) {
        addImage(newImages: $newImages) {
          _id
          small
        }
      }
    `,
    fetchPolicy: 'no-cache'
  });
  client.resetStore();

  const { data } = result;

  if (data.addImage.message) {
    throw new Error(
      `${data.addImage.statusCode} ${
        homePageEditTranslations[data.addImage.message]
      }`
    );
  }

  return data.addImage;
};

const updateHomePageLooksImage = async (id, updatedImage) => {
  const result = await client.query({
    variables: {
      id,
      updatedImage
    },
    context: { headers: { token } },
    mutation: gql`
      mutation($id: ID!, $updatedImage: Upload!) {
        updateImage(id: $id, updatedImage: $updatedImage) {
          small
        }
      }
    `,
    fetchPolicy: 'no-cache'
  });
  client.resetStore();

  const { data } = result;

  if (data.updateImage.message) {
    throw new Error(
      `${data.updateImage.statusCode} ${
        homePageEditTranslations[data.updateImage.message]
      }`
    );
  }

  return data.updateImage;
};

const deleteHomePageLooksImage = async (id) => {
  const result = await client.mutate({
    variables: { id },
    context: { headers: { token } },
    mutation: gql`
      mutation($id: ID!) {
        deleteHomePageLooksImage(id: $id) {
          _id
        }
      }
    `,
    fetchPolicy: 'no-cache'
  });
  client.resetStore();

  const { data } = result;

  if (data.deleteHomePageLooksImage.message) {
    throw new Error(
      `${data.deleteHomePageLooksImage.statusCode} ${
        homePageEditTranslations[data.deleteHomePageLooksImage.message]
      }`
    );
  }

  return data.deleteHomePageLooksImage;
};

export {
  getHomePageLooksImages,
  addHomePageLooksImages,
  updateHomePageLooksImage,
  deleteHomePageLooksImage
};
