import {
  updateSectionTitleVariables,
  deleteFilesFromSectionVariables
} from '../../../../pages/about-us/tests/about-us.variables';
import {
  updateBusinessTextByCode,
  deleteFiles
} from '../operations/about-us.mutation';

export const sectionEditMocks = [
  {
    request: {
      query: updateBusinessTextByCode,
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
