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
  const { data } = await getItems(query);

  return data.getPopularCategories;
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

  const { data } = await getItems(query);

  return data.getPopularProducts;
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

  const { data } = await getItems(query, { days });

  return data.getUsersForStatistic;
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

  const { data } = await getItems(query, { date });

  return data.getOrdersStatistic;
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

  const { data } = await getItems(query, { date });

  return data.getPaidOrdersStatistic;
};

export {
  getPopularCategories,
  getPopularProducts,
  getOrdersStats,
  getPaidOrdersStats,
  getUsersByDays
};
