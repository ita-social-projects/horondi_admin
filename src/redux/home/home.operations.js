import { getItems, setItems } from '../../utils/client';
import { homePageEditErrors } from '../../configs/error-modal-messages';

const getHomePageLooksImages = async () => {
  const query = `
      query {
        getHomePageLooksImages {
          _id
          images {
            small
          }
        }
      }
    `;

  const result = await getItems(query);

  return result?.data?.getHomePageLooksImages;
};
const updateHomePageLooksImage = async (id, upload) => {
  const query = `
      mutation($id: ID!, $upload: Upload) {
        updateHomePageLooksImage(id: $id, images: $upload) {
          ... on HomePageImages {
            images {
              small
            }
          }
          ... on Error {
            statusCode
            message
          }
        }
      }
    `;

  const result = await setItems(query, { id, upload });

  if (
    Object.keys(homePageEditErrors).includes(
      result?.data?.updateHomePageLooksImage?.message
    )
  ) {
    throw new Error(
      `${result.data.updateHomePageLooksImage.statusCode} ${
        homePageEditErrors[result.data.updateHomePageLooksImage.message]
      }`
    );
  }

  return result?.data?.updateHomePageLooksImage;
};

export { getHomePageLooksImages, updateHomePageLooksImage };
