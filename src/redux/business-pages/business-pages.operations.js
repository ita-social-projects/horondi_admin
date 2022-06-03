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
        }
      }
    `;

  const result = await getItems(getAllBusinessPagesQuery);

  return result?.data?.getAllBusinessTexts;
};
export const getBusinessTextByCodeWithPopulatedTranslationsKey = async (
  code
) => {
  const getBusinessTextByCodeWithPopulatedTranslationsKeyQuery = `
  query($code: String!) {
    getBusinessTextByCodeWithPopulatedTranslationsKey(code: $code) {
      __typename
      ... on BusinessTextWithPopulatedTranslationsKey {
        _id
        code
        languages
        translations {
          ua {
            title
            text
          }
          en {
            title
            text
          }
        }
      }
      ... on Error {
        message
        statusCode
      }
    }
  }
`;

  const result = await getItems(
    getBusinessTextByCodeWithPopulatedTranslationsKeyQuery,
    { code }
  );

  if (
    Object.keys(newsErrors).includes(result?.data?.getBusinessTextById?.message)
  ) {
    throw new Error(
      `${result.data.getBusinessTextById.statusCode} ${
        newsErrors[result.data.getBusinessTextById.message]
      }`
    );
  }

  return result?.data?.getBusinessTextByCodeWithPopulatedTranslationsKey;
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
export const updateBusinessPage = async ({
  id,
  page,
  businessTextTranslationFields,
  files
}) => {
  const updateBusinessPageMutation = `
  mutation(
    $id: ID!
    $businessText: BusinessTextInput!
    $businessTextTranslationFields: BusinessTextTranslationFieldsInput!
    $files: [Upload]!
    $populated: Boolean
  ) {
    updateBusinessText(
      id: $id
      businessText: $businessText
      businessTextTranslationFields: $businessTextTranslationFields
      files: $files
      populated: $populated
    ) {
      ... on BusinessTextWithPopulatedTranslationsKey {
        _id
        code
      }
      ... on BusinessText {
        _id
        code
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
    businessTextTranslationFields,
    files,
    populated: false
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
