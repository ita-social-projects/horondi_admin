import { getItems, setItems } from '../../utils/client';
import {
  businessPageErrors,
  newsErrors
} from '../../configs/error-modal-messages';

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
export const getBusinessPageByCode = async (code) => {
  const getBusinessPageByCodeQuery = `
  query ($code: String!) {
    getBusinessTextByCode(code: $code) {
      __typename
      ... on BusinessText {
        _id
        code
        title {
          value
        }
        text {
          value
        }
        translationsKey
        date
      }
    }
  }
`;

  const result = await getItems(getBusinessPageByCodeQuery, { code });
  if (
    Object.keys(newsErrors).includes(result?.data?.getBusinessTextById?.message)
  ) {
    throw new Error(
      `${result.data.getBusinessTextById.statusCode} ${
        newsErrors[result.data.getBusinessTextById.message]
      }`
    );
  }

  return result?.data?.getBusinessTextByCode;
};
export const createBusinessPage = async ({ page, files }) => {
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

  if (
    Object.keys(businessPageErrors).includes(
      result?.data?.addBusinessText?.message
    )
  ) {
    throw new Error(
      `${result.data.addBusinessText.statusCode} ${
        businessPageErrors[result.data.addBusinessText.message]
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

  const result = await setItems(deleteBusinessPageMutation, { id });

  if (
    Object.keys(newsErrors).includes(result?.data?.deleteBusinessText?.message)
  ) {
    throw new Error(
      `${result.data.deleteBusinessText.statusCode} ${
        newsErrors[result.data.deleteBusinessText.message]
      }`
    );
  }

  return result?.data?.deleteBusinessText;
};
export const updateBusinessPage = async ({ id, page, files }) => {
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

  if (
    Object.keys(newsErrors).includes(result?.data?.updateBusinessText?.message)
  ) {
    throw new Error(
      `${result.data.updateBusinessText.statusCode} ${
        newsErrors[result.data.updateBusinessText.message]
      }`
    );
  }

  return result?.data?.updateBusinessText;
};
