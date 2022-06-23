import { gql } from '@apollo/client';

export const getBusinessTextByCodeWithPopulatedTranslationsKey = gql`
  query ($code: String!) {
    getBusinessTextByCodeWithPopulatedTranslationsKey(code: $code) {
      __typename
      ... on BusinessTextWithPopulatedTranslationsKey {
        _id
        code
        languages
        sectionsImgs {
          id
          name
          src
        }
        footerImg {
          name
          src
        }
        translations {
          ua {
            title
            sections {
              id
              title
              text
            }
          }
          en {
            title
            sections {
              id
              title
              text
            }
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
