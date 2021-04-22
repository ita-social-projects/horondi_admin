import { getItems, setItems } from '../../utils/client';
import { homePageEditTranslations } from '../../translations/home-page-edit.translations';

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

  const { data } = await getItems(query);

  return data.getHomePageLooksImages;
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

  const { data } = await setItems(query, { id, upload });

  if (
    Object.keys(homePageEditTranslations).includes(
      data.updateHomePageLooksImage?.message
    )
  ) {
    throw new Error(
      `${data.updateHomePageLooksImage.statusCode} ${
        homePageEditTranslations[data.updateHomePageLooksImage.message]
      }`
    );
  }

  return data.updateHomePageLooksImage;
};

export { getHomePageLooksImages, updateHomePageLooksImage };
