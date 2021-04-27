import {getItems} from '../../utils/client';

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

    const result = await getItems(getAllHistoryRecordsQuery, {
        limit,
        skip,
        filter
    });

    return result?.data?.getAllHistoryRecords;
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

    const result = await getItems(getHistoryRecordQuery, {id});

    return result?.data?.getHistoryRecordById;
};

export {getAllHistoryRecords, getHistoryRecord};
