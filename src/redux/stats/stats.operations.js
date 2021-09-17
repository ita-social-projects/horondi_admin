import { getItems } from '../../utils/client';

const getPopularCategories = async () => {
  const query = `
	query {
		getPopularCategories {
			names
			counts
			relations
		}
	}
 `;
  const result = await getItems(query);

  return result?.data?.getPopularCategories;
};

const getPopularProducts = async () => {
  const query = `
		query {
			getPopularProducts{
				labels
				counts
				total
			}
		}	
	`;

  const result = await getItems(query);

  return result?.data?.getPopularProducts;
};

const getUsersByDays = async (days) => {
  const query = `
		query ($days: Int!) {
			getUsersForStatistic(filter: {days: $days}) {
				counts
				labels
				total
			}
		}
	`;

  const result = await getItems(query, { days });

  return result?.data?.getUsersForStatistic;
};

const getOrdersStats = async (date) => {
  const query = `
		query($date: Int!) {
			getOrdersStatistic(date: $date) {
				names
				counts
				relations
			}
		}
	`;

  const result = await getItems(query, { date });

  return result?.data?.getOrdersStatistic;
};

const getPaidOrdersStats = async (date) => {
  const query = `
		query($date: Int!) {
			getPaidOrdersStatistic(date: $date) {
				labels
				counts
				total
			}
		}
	`;

  const result = await getItems(query, { date });

  return result?.data?.getPaidOrdersStatistic;
};

export {
  getPopularCategories,
  getPopularProducts,
  getOrdersStats,
  getPaidOrdersStats,
  getUsersByDays
};
