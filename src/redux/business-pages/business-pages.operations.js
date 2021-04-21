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

    const {data} = await getItems(getAllBusinessPagesQuery);

    return data.getAllBusinessTexts;
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

    const {data} = await getItems(getBusinessPageByIdQuery, {id});

    if (Object.keys(newsTranslations).includes(data.getBusinessTextById?.message)) {
        throw new Error(
            `${data.getBusinessTextById.statusCode} ${
                newsTranslations[data.getBusinessTextById.message]
            }`
        );
    }

    return data.getBusinessTextById;
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

    const {data} = await setItems(createBusinessPageMutation, {
        businessText: page,
        files
    });

    if (Object.keys(businessTranslations).includes(data.addBusinessText?.message)) {
        throw new Error(
            `${data.addBusinessText.statusCode} ${
                businessTranslations[data.addBusinessText.message]
            }`
        );
    }

    return data.addBusinessText;
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

    const {data} = await setItems(deleteBusinessPageMutation, {id});

    if (Object.keys(newsTranslations).includes(data.deleteBusinessText?.message)) {
        throw new Error(
            `${data.deleteBusinessText.statusCode} ${
                newsTranslations[data.deleteBusinessText.message]
            }`
        );
    }

    return data.deleteBusinessText;
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

    const {data} = await setItems(updateBusinessPageMutation, {
        id,
        businessText: page,
        files
    });

    if (Object.keys(newsTranslations).includes(data.updateBusinessText?.message)) {
        throw new Error(
            `${data.updateBusinessText.statusCode} ${
                newsTranslations[data.updateBusinessText.message]
            }`
        );
    }

    return data.updateBusinessText;
};
