import {getItems, setItems} from '../../utils/client';
import {homePageEditTranslations} from '../../translations/home-page-edit.translations';

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

    const result = await setItems(query, {id, upload});

    if (
        Object.keys(homePageEditTranslations).includes(
            result?.data?.updateHomePageLooksImage?.message
        )
    ) {
        throw new Error(
            `${result.data.updateHomePageLooksImage.statusCode} ${
                homePageEditTranslations[result.data.updateHomePageLooksImage.message]
            }`
        );
    }

    return result?.data?.updateHomePageLooksImage;
};

export {getHomePageLooksImages, updateHomePageLooksImage};
