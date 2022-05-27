import { setItems, getItems } from '../../utils/client';
import { constructorErrors } from '../../configs/error-modal-messages';

export const getAllBasics = async (limit, skip, filter) => {
  const query = `
        query($limit: Int!, $skip: Int!, $filter: BasicsFilterInput) {
					getAllBasics(limit: $limit, skip: $skip, filter: $filter){
						items {
							_id
							name {
								lang
								value
							}
							images {
								large
								medium
								small
								thumbnail
							}
							absolutePrice
							available
              features {
                material {
                  _id
                  name {
                    lang
                    value
                  }
                }
                color{
                  _id
                  name{
                    lang
                    value
                  }
                }
              }
						}
						count
					}
      	}
    	`;

  const result = await getItems(query, { limit, skip, filter });

  if (
    Object.keys(constructorErrors).includes(result?.data?.getAllBasics?.message)
  ) {
    throw new Error(
      `${result.data.getAllBasics.statusCode} ${
        constructorErrors[result.data.getAllBasics.message]
      }`
    );
  }

  return result?.data?.getAllBasics;
};

export const createBasic = async (payload) => {
  const createQuery = `
		mutation($basic: BasicsInput!, $image: Upload!) {
			addBasic(basic: $basic, image: $image) {
				... on Basics {
					_id
				}
				... on Error {
					message
					statusCode
				}
			}
		}
	`;

  const result = await setItems(createQuery, payload);

  if (
    Object.keys(constructorErrors).includes(result?.data?.addBasic?.message)
  ) {
    throw new Error(
      `${result.data.addBasic.statusCode} ${
        constructorErrors[result.data.addBasic.message]
      }`
    );
  }

  return result?.data?.addBasic;
};

export const deleteBasic = async (id) => {
  const query = `
    mutation($id: ID!) {
      deleteBasic(id: $id) {
        ... on Basics {
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
  return result?.data?.deleteBasic;
};

export const updateBasic = async (id, basic, image) => {
  const query = `
    mutation($id: ID!, $basic: BasicsInput!, $image: Upload) {
      updateBasic(id: $id, basic: $basic, image: $image) {
        ... on Basics {
          _id
        }
        ... on Error {
          statusCode
          message
        }
      }
    }
  `;

  const result = await setItems(query, { id, basic, image });
  return result?.data?.updateBasic;
};

export const getBasicById = async (id) => {
  const query = `
    query($id: ID) {
      getBasicById(id: $id) {
        ... on Basics {
          _id
          name {
            lang
            value
          }
          images {
            large
						medium
						small
						thumbnail
          }
          absolutePrice
          available
          features {
            material {
              _id
              name {
                lang
                value
              }
            }
            color{
              _id
              name{
                lang
                value
              }
            }
          }
        }
        ... on Error{
          statusCode
          message
        } 
      }
    }  
  `;

  const result = await getItems(query, { id });

  if (
    Object.keys(constructorErrors).includes(result?.data?.getBasicById?.message)
  ) {
    throw new Error(
      `${result.data.getBasicById.statusCode} ${
        constructorErrors[result.data.getBasicById.message]
      }`
    );
  }
  return result?.data?.getBasicById;
};
