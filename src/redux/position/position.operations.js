import { setItems, getItems } from '../../utils/client';

export const getAllPositions = async (limit, skip, filter) => {
  const query = `query($limit: Int, $skip: Int, $filter: PositionsFilterInput) {
                        getAllPositions(limit: $limit, skip: $skip, filter: $filter) {
                        ... on PaginatedPositions {
                            items {
                            _id
                            name {
                                lang
                                value
                            }
                            available
                            }
                            count
                        }
                      }
                    }
                `;

  const result = await getItems(query, { limit, skip, filter });

  return result?.data?.getAllPositions;
};

export const deletePosition = async (id) => {
  const query = `mutation($id: ID!) {
                      deletePosition(id: $id) {
                      ... on Position {
                        _id
                      }
                      ... on Error {
                        statusCode
                        message
                      }
                    }
                  }
                `;

  const result = await setItems(query, { id });

  return result?.data?.deletePosition;
};

export const addPosition = async (payload) => {
  const query = `mutation($position: PositionInput!) {
                    addPosition(position: $position) {
                      ... on Position {
                        name {
                          lang
                          value
                        }
                        available
                      }
                      ... on Error {
                        message
                        statusCode
                      }
                    }
                  }
                `;

  const result = await setItems(query, payload);

  return result?.data?.addPosition;
};

export const getPositionById = async (id) => {
  const query = `query($id: ID!) {
                    getPositionById(id: $id) {
                      ... on Position {
                        _id
                        name {
                          lang
                          value
                        }
                        available
                      }
                      ... on Error {
                        statusCode
                        message
                      }
                    }
                  }
                `;

  const result = await getItems(query, { id });

  return result?.data?.getPositionById;
};

export const updatePosition = async (id, position) => {
  const query = `mutation updatePosition($id: ID!, $position: PositionInput!) {
                    updatePosition(id: $id, position: $position) {
                      ... on Position {
                        _id
                      }
                      ... on Error {
                        statusCode
                        message
                      }
                    }
                  }
                `;
  const result = await setItems(query, { id, position });

  return result?.data?.updatePosition;
};
