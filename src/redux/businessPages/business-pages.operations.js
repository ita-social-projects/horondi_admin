import { gql } from 'apollo-boost';
import { client } from '../../utils/client';
import { businessTranslations } from '../../translations/business.translations';
import { newsTranslations } from '../../translations/news.translations';

const getAllBusinessPages = async () => {
  const result = await client.query({
    query: gql`
      query {
        getAllBusinessTexts {
          _id
          code
          title {
            value
          }
          text {
            value
          }
        }
      }
    `
  });
  client.resetStore();
  const { data } = result;
  return data.getAllBusinessTexts;
};

const createBusinessPage = async (businessText) => {
  const result = await client.mutate({
    mutation: gql`
      mutation($businessText: BusinessTextInput!) {
        addBusinessText(businessText: $businessText) {
          ... on BusinessText {
            _id
          }
          ... on Error {
            message
            statusCode
          }
        }
      }
    `,
    fetchPolicy: 'no-cache',
    variables: { businessText }
  });
  client.resetStore();
  const { data } = result;

  if (data.addBusinessText.message) {
    throw new Error(
      `${data.addBusinessText.statusCode} ${
        businessTranslations[data.addBusinessText.message]
      }`
    );
  }

  return data.addBusinessText;
};

const deleteBusinessPage = async (id) => {
  const result = await client.mutate({
    variables: { id },
    mutation: gql`
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
    `,
    fetchPolicy: 'no-cache'
  });
  client.resetStore();
  const { data } = result;

  if (data.deleteBusinessText.message) {
    throw new Error(
      `${data.deleteBusinessText.statusCode} ${
        newsTranslations[data.deleteBusinessText.message]
      }`
    );
  }

  return data.deleteBusinessText;
};

export { getAllBusinessPages, createBusinessPage, deleteBusinessPage };
