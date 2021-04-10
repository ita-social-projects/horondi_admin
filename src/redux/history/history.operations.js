import { getItems } from '../../utils/client';

const getAllHistoryRecordsQuery = `
query(
  $limit: Int!
  $skip: Int!
) {
  getAllHistoryRecords(
    limit: $limit
    skip: $skip
  ) {
  ...on History {
     items{
        action
        subject{
          name
          subjectId
        }
        valueBeforeChange
        valueAfterChange
        userId{
          firstName
          lastName
          role
        }
        createdAt
      }
      count
  }
    ...on Error {
      message
      statusCode
    }
  }
}
`;

const getAllHistoryRecords = async (limit, skip) => {
  const options = {
    limit,
    skip
  };

  const { data } = await getItems(getAllHistoryRecordsQuery, options);

  return data.getAllHistoryRecords;
};

export { getAllHistoryRecords };
