import { getItems } from '../../utils/client';

const getAllHistoryRecords = async (limit, skip, filter) => {
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
        _id
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

  const { data } = await getItems(getAllHistoryRecordsQuery, {
    limit,
    skip,
    filter
  });

  return data.getAllHistoryRecords;
};

const getHistoryRecord = async (id) => {
  const getHistoryRecordQuery = `
query(
  $id: ID!
) {
  getHistoryRecordById(
    id: $id
  ) {
  ...on HistoryRecord {
      _id
      action
        subject{
          model
          name
          subjectId
        }
        valueBeforeChange
        valueAfterChange
        userId{
          _id
          email
          firstName
          lastName
          role
        }
     valueBeforeChange
     valueAfterChange
  }
    ...on Error {
      message
      statusCode
    }
  }
}
`;

  const { data } = await getItems(getHistoryRecordQuery, { id });

  return data.getHistoryRecordById;
};

export { getAllHistoryRecords, getHistoryRecord };
