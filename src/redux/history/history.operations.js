import { getItems } from '../../utils/client';

const getAllHistoryRecordsQuery = `
query(
  $limit: Int!
  $skip: Int!
  $filter:HistoryFilterInput
) {
  getAllHistoryRecords(
    limit: $limit
    skip: $skip
    filter:$filter
  ) {
  ...on History {
     items{
        action
        subject{
          model
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

const getAllHistoryRecords = async (limit, skip, filter) => {
  const options = {
    limit,
    skip,
    filter
  };

  const { data } = await getItems(getAllHistoryRecordsQuery, options);

  return data.getAllHistoryRecords;
};

export { getAllHistoryRecords };
