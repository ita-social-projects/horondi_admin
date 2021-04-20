import { getItems, setItems } from '../../utils/client';
import { businessTranslations } from '../../translations/business.translations';
import { newsTranslations } from '../../translations/news.translations';
import { AUTH_ERRORS } from '../../error-messages/auth';

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

export const getAllBusinessPages = async () => {
  const { data } = await getItems(getAllBusinessPagesQuery);

  return data.getAllBusinessTexts;
};
export const getBusinessPageById = async (id) => {
  const { data } = await getItems(getBusinessPageByIdQuery, { id });

  if (data.getBusinessTextById.message) {
    throw new Error(
      `${data.getBusinessTextById.statusCode} ${
        newsTranslations[data.getBusinessTextById.message]
      }`
    );
  }

  return data.getBusinessTextById;
};
export const createBusinessPage = async ({ page, files }) => {
  const { data } = await setItems(createBusinessPageMutation, {
    businessText: page,
    files
  });

  if (
    data.addBusinessText.message &&
    data.addBusinessText.message !== AUTH_ERRORS.ACCESS_TOKEN_IS_NOT_VALID
  ) {
    throw new Error(
      `${data.addBusinessText.statusCode} ${
        businessTranslations[data.addBusinessText.message]
      }`
    );
  }

  return data.addBusinessText;
};
export const deleteBusinessPage = async (id) => {
  const { data } = await setItems(deleteBusinessPageMutation, { id });

  if (
    data.deleteBusinessText.message &&
    data.deleteBusinessText.message !== AUTH_ERRORS.ACCESS_TOKEN_IS_NOT_VALID
  ) {
    throw new Error(
      `${data.deleteBusinessText.statusCode} ${
        newsTranslations[data.deleteBusinessText.message]
      }`
    );
  }

  return data.deleteBusinessText;
};
export const updateBusinessPage = async ({ id, page, files }) => {
  const { data } = await setItems(updateBusinessPageMutation, {
    id,
    businessText: page,
    files
  });

  if (
    data.updateBusinessText.message &&
    data.updateBusinessText.message !== AUTH_ERRORS.ACCESS_TOKEN_IS_NOT_VALID
  ) {
    throw new Error(
      `${data.updateBusinessText.statusCode} ${
        newsTranslations[data.updateBusinessText.message]
      }`
    );
  }

  return data.updateBusinessText;
};
