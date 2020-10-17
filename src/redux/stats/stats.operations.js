import { getItems } from '../../utils/client';

const getPopularCategories = async () => {
  const res = await getItems(`
	query {
		getPopularCategories {
			...on PopularCategories {
				names
				counts
				relations
			}
			...on Error {
				statusCode
				message
			}
		}
	}
 `);
  return res;
};

export { getPopularCategories };
