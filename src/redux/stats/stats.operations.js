import { getItems } from '../../utils/client';

const getPopularCategories = async () => {
  const res = await getItems(`
	query {
		getPopularCategories {
			names
			counts
			relations
		}
	}
 `);
  return res.data.getPopularCategories;
};

const getPopularProducts = async () => {
  const res = await getItems(`
		query {
			getPopularProducts{
				labels
				counts
			}
		}	
	`);
  return res.data.getPopularProducts;
};

const getUsersByDays = async (days) => {
  const res = await getItems(
    `
		query ($days: Int!) {
			getUsersForStatistic(filter: {days: $days}) {
				counts
				labels
			}
		}
	`,
    { days }
  );
  return res.data.getUsersForStatistic;
};

export { getPopularCategories, getPopularProducts };
