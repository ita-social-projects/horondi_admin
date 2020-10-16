import { getItems } from '../../utils/client';

const getSalesByCategory = async () => {
  const res = await getItems(`
	query {
		getPopularCategories {
			...on PopularCategories {
				categories {
					name 
					stats {
						purchasedCount
						relation
					}
				}
			}
			...on Error {
				statusCode
				message
			}
		}
	}
 `);
  return res.data.getPopularCategories;
};

export { getSalesByCategory };
