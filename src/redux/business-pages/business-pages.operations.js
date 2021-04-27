import {getItems, setItems} from '../../utils/client';
import {businessTranslations} from '../../translations/business.translations';
import {newsTranslations} from '../../translations/news.translations';

export const getAllBusinessPages = async () => {
    const getAllBusinessPagesQuery = `
      query {
        getAllBusinessTexts {
          _id
          code
          title {
            value
          }
        }
      }
    `;

    const result = await getItems(getAllBusinessPagesQuery);

    return result?.data?.getAllBusinessTexts;
};
export const getBusinessPageById = async (id) => {
    const getBusinessPageByIdQuery = `
      query($id: ID!) {
        getBusinessTextById(id: $id) {
          ... on BusinessText {
            _id
            code
            title {
              lang
              value
            }
            text {
              lang
              value
            }
            languages
          }
          ... on Error {
            message
            statusCode
          }
        }
      }
    `;

    const result = await getItems(getBusinessPageByIdQuery, {id});

    if (Object.keys(newsTranslations).includes(result?.data?.getBusinessTextById?.message)) {
        throw new Error(
            `${result.data.getBusinessTextById.statusCode} ${
                newsTranslations[result.data.getBusinessTextById.message]
            }`
        );
    }

    return result?.data?.getBusinessTextById;
};
export const createBusinessPage = async ({page, files}) => {
    const createBusinessPageMutation = `
      mutation($businessText: BusinessTextInput!, $files: [Upload]!) {
        addBusinessText(businessText: $businessText, files: $files) {
          ... on BusinessText {
            _id
          }
          ... on Error {
            message
            statusCode
          }
        }
      }
    `;

    const result = await setItems(createBusinessPageMutation, {
        businessText: page,
        files
    });

    if (Object.keys(businessTranslations).includes(result?.data?.addBusinessText?.message)) {
        throw new Error(
            `${result.data.addBusinessText.statusCode} ${
                businessTranslations[result.data.addBusinessText.message]
            }`
        );
    }

    return result?.data?.addBusinessText;
};
export const deleteBusinessPage = async (id) => {
    const deleteBusinessPageMutation = `
      mutation($id: ID!) {
        deleteBusinessText(id: $id) {
          ... on BusinessText {
            title {
              value
            }
          }
          ... on Error {
            message
            statusCode
          }
        }
      }
    `;

    const result = await setItems(deleteBusinessPageMutation, {id});

    if (Object.keys(newsTranslations).includes(result?.data?.deleteBusinessText?.message)) {
        throw new Error(
            `${result.data.deleteBusinessText.statusCode} ${
                newsTranslations[result.data.deleteBusinessText.message]
            }`
        );
    }

    return result?.data?.deleteBusinessText;
};
export const updateBusinessPage = async ({id, page, files}) => {
    const updateBusinessPageMutation = `
      mutation($id: ID!, $businessText: BusinessTextInput!, $files: [Upload]!) {
        updateBusinessText(
          id: $id
          businessText: $businessText
          files: $files
        ) {
          ... on BusinessText {
            _id
            title {
              value
            }
          }
          ... on Error {
            message
            statusCode
          }
        }
      }
    `;

    const result = await setItems(updateBusinessPageMutation, {
        id,
        businessText: page,
        files
    });

    if (Object.keys(newsTranslations).includes(result?.data?.updateBusinessText?.message)) {
        throw new Error(
            `${result.data.updateBusinessText.statusCode} ${
                newsTranslations[result.data.updateBusinessText.message]
            }`
        );
    }

    return result?.data?.updateBusinessText;
};
