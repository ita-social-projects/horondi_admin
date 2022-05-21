import { gql } from '@apollo/client';

export const deleteFiles = gql`
  mutation ($fileNames: [String]!) {
    deleteFiles(fileNames: $fileNames)
  }
`;

export const updateBusinessText = gql`
  mutation (
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
        sectionsImgs {
          id
          name
          src
        }
        footerImg {
          id
          name
          src
        }
        languages
        translations {
          _id
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
      ... on BusinessText {
        _id
        code
        sectionsImgs {
          name
          src
        }
        languages
        translationsKey
      }
      ... on Error {
        message
        statusCode
      }
    }
  }
`;
