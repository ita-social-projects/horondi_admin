import { gql } from '@apollo/client';

export const deleteFiles = gql`
  mutation ($fileNames: [String]!) {
    deleteFiles(fileNames: $fileNames)
  }
`;

export const updateBusinessTextByCode = gql`
  mutation ($id: ID!, $businessText: BusinessTextInput!, $files: [Upload]!) {
    updateBusinessText(id: $id, businessText: $businessText, files: $files) {
      ... on BusinessText {
        _id
        code
        title {
          lang
          value
        }
        sections {
          lang
          value {
            id
            title
            text
            img {
              name
              src
            }
          }
        }
        text {
          lang
          value
        }
        languages
        footerImg {
          name
          src
        }
      }
      ... on Error {
        message
        statusCode
      }
    }
  }
`;
