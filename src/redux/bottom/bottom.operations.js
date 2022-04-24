import { getItems, setItems } from '../../utils/client';
import { bottomTranslations } from '../../configs/error-modal-messages';

export const getAllBottoms = async (limit, skip, filter) => {
  const getAllBottomsQuery = `
    query (
      $limit: Int!
      $skip: Int!
      $filter: BottomFilterInput
    ){
        getAllBottoms(limit: $limit, skip: $skip, filter: $filter) {
          items {
            _id
            name {
              lang
              value
            }
            optionType
            features {
              material {
                name {
                  lang
                  value
                }
              }
              color {
                name {
                  lang
                  value
                }
              }
            }
            images{
                thumbnail
                medium
                small
                large
            }
            absolutePrice
            available
          }
          count
        }
      }
    `;

  const result = await getItems(getAllBottomsQuery, {
    limit,
    skip,
    filter
  });

  if (
    Object.keys(bottomTranslations).includes(
      result?.data?.getAllBottoms?.message
    )
  ) {
    throw new Error(
      `${result.data.getAllBottoms.statusCode} ${
        bottomTranslations[result.data.getAllBottoms.message]
      }`
    );
  }

  return result?.data.getAllBottoms;
};

export const getBottomById = async (id) => {
  const getBottomByIdQuery = `
      query ($id: ID!){
        getBottomById(id: $id) {
            ... on Bottom {
                name {
                  lang
                  value
                }
                optionType
                features {
                  material {
                    _id
                    name {
                      lang
                      value
                    }
                  }
                  color {
                    _id
                    name {
                      lang
                      value
                    }
                  }
                }
                images{
                    thumbnail
                    medium
                    small
                    large
                }
                absolutePrice
                available
            }
            ... on Error {
                statusCode
                message
            }  
          }
        }
      `;

  const result = await getItems(getBottomByIdQuery, { id });

  if (
    Object.keys(bottomTranslations).includes(
      result?.data?.getBottomById?.message
    )
  ) {
    throw new Error(
      `${result.data.getBottomById.statusCode} ${
        bottomTranslations[result.data.getBottomById.message]
      }`
    );
  }

  return result?.data.getBottomById;
};

export const deleteBottom = async (id) => {
  const deleteBottomQuery = `
        mutation($id: ID!) {
          deleteBottom(id: $id) {
            ... on Bottom {
              _id
            }
            ... on Error {
              statusCode
              message
            }  
          }  
        }
      `;

  const result = await setItems(deleteBottomQuery, { id });

  return result?.data?.deleteBack;
};

export const createBottom = async (payload) => {
  const createBottomQuery = `
      mutation($bottom: BottomInput!, $image: Upload!) {
        addBottom(bottom: $bottom, image: $image) {
          ... on Bottom {
            _id
            name {
              lang
              value
            }  
          }
          ... on Error {
            message
            statusCode
          }
        }
      }
    `;

  const result = await setItems(createBottomQuery, payload);

  if (
    Object.keys(bottomTranslations).includes(result?.data?.addBottom?.message)
  ) {
    throw new Error(
      `${result.data.addBottom.statusCode} ${
        bottomTranslations[result.data.addBottom.message]
      }`
    );
  }

  return result?.data?.addBottom;
};

export const updateBottom = async (payload) => {
  const updateBottomQuery = `
      mutation($id: ID!, $bottom: BottomInput!, $image: Upload) {
        updateBottom(id: $id, bottom: $bottom, image: $image) {
          ... on Bottom {
            _id
            name {
              lang
              value
            }
            optionType
            features {
              material {
                name {
                  lang
                  value
                }
              }
              color {
                name {
                  lang
                  value
                }
              }
            }
            images{
                thumbnail
                medium
                small
                large
            }
            absolutePrice
            available  
          }
        }
      }
    `;

  const result = await setItems(updateBottomQuery, payload);

  if (
    Object.keys(bottomTranslations).includes(
      result?.data?.updateBottom?.message
    )
  ) {
    throw new Error(
      `${result.data.updateBottom.statusCode} ${
        bottomTranslations[result.data.updateBottom.message]
      }`
    );
  }

  return result?.data?.updateBottom;
};
