import { setItems, getItems } from '../../utils/client';

export const getAllBasics = async (limit, skip, filter) => {
  const query = `
        query($limit: Int!, $skip: Int!, filter: BasicsFilterInput) {
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
							additionalPrice {
								currency
								value
							}
							available
						}
						count
					}
      	}
    	`;

  const result = await getItems(query, { limit, skip, filter });
  return result?.data?.getAllBasics;
};

export const createBasics = async (payload) => {
  const query = `
		mutation($basic: BasicsInput!, $image: Upload) {
			addBasics(basic: $basic, image: $image) {
				... on Basics {
					_id
				}
				... on Errors {
					message
					statusCode
				}
			}
		}
	`;

  const result = await setItems(query, payload);
  return result?.data?.addBasics;
};
