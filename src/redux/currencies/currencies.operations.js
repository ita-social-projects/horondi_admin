import { getItems } from '../../utils/client';

export const getAllCurrencies = async () => {
  const query = `
      query {
      getAllCurrencies {
        convertOptions {
          name
          exchangeRate 
        }
      }
    }
    `;

  const result = await getItems(query, {});
  return result?.data?.getAllCurrencies;
};
