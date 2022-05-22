import {
  updateSectionTitleVariables,
  deleteFilesFromSectionVariables
} from '../../../../pages/about-us/tests/about-us.variables';
import {
  updateBusinessText,
  deleteFiles
} from '../operations/about-us.mutation';

export const sectionEditMocks = [
  {
    request: {
      query: updateBusinessText,
      variables: updateSectionTitleVariables
    },
    result: {
      data: {
        updateBusinessText: updateSectionTitleVariables.businessText
      }
    }
  },
  {
    request: {
      query: deleteFiles,
      variables: deleteFilesFromSectionVariables
    },
    result: {
      data: {
        deleteFiles: {}
      }
    }
  }
];
