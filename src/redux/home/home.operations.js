import { gql } from '@apollo/client';
import { client } from '../../utils/client';

import { contactTranslations } from '../../translations/contact.translations';
import { getFromLocalStorage } from '../../services/local-storage.service';

const getHomePageLooksImages = async () => {
  const result = await client.query({
    variables: {
      skip,
      limit
    },
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

const updateHomePageLooksImages = async () => {
  const result = await client.query({
    variables: {
      skip,
      limit
    },
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

export {
  getHomePageLooksImages,
  updateHomePageLooksImages,
};
