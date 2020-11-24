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
				total
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
				total
			}
		}
	`,
    { days }
  );
  return res.data.getUsersForStatistic;
};

const getOrdersStats = async (date) => {
  const res = await getItems(
    `
		query($date: Int!) {
			getOrdersStatistic(date: $date) {
				names
				counts
				relations
			}
		}
	`,
    { date }
  );
  return res.data.getOrdersStatistic;
};

const getPaidOrdersStats = async (date) => {
  const res = await getItems(
    `
		query($date: Int!) {
			getPaidOrdersStatistic(date: $date) {
				labels
				counts
				total
			}
		}
	`,
    { date }
  );
  return res.data.getPaidOrdersStatistic;
};

export {
  getPopularCategories,
  getPopularProducts,
  getOrdersStats,
  getPaidOrdersStats,
  getUsersByDays
};
