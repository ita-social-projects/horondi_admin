import { gql } from 'apollo-boost';
import { client } from '../../utils/client';
import { businessTranslations } from '../../translations/business.translations';

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

const createBusinessPage = async (page) => {
  const result = await client.mutate({
    mutation: gql`
      mutation($businessText: BusinessTextInput!) {
        addBusinessText(businessText: $businessText) {
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
    fetchPolicy: 'no-cache',
    variables: { page }
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

export { getAllBusinessPages, createBusinessPage };
