import { setItems } from '../../utils/client';

export const createPockets = async (payload) => {
  const query = `
          mutation($pocket: PocketInput!, $upload: Upload!) {
              addPocket(pocket: $pocket, images: $upload) {
                  ... on Pocket {
                       _id
                  }
                  ... on Error {
                      message
                      statusCode
                  }
              }
          }
      `;

  const result = await setItems(query, payload);

  return result?.data?.addPockets;
};
