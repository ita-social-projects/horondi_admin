import { gql } from '@apollo/client';
import { client } from '../../utils/client';

const getAllProducts = async (productsState, tableState) => {
  const result = await client.query({
    query: gql`
      query(
        $search: String
        $price: [Int]
        $colors: [String]
        $patterns: [String]
        $isHotItem: Boolean
        $skip: Int
        $limit: Int
        $rate: Int
        $basePrice: Int
        $purchasedCount: Int
        $category: [String]
        $models: [String]
      ) {
        getProducts(
          filter: {
            colors: $colors
            pattern: $patterns
            price: $price
            category: $category
            isHotItem: $isHotItem
            models: $models
          }
          skip: $skip
          limit: $limit
          search: $search
          sort: {
            rate: $rate
            basePrice: $basePrice
            purchasedCount: $purchasedCount
          }
        ) {
          items {
            _id
            purchasedCount
            name {
              lang
              value
            }
            basePrice {
              value
            }
            model {
              value
            }
            rate
            images {
              primary {
                large
                medium
                large
                small
              }
            }
            colors {
              name {
                lang
                value
              }
              simpleName {
                lang
                value
              }
            }
            pattern {
              lang
              value
            }
            category {
              _id
              name {
                value
              }
              isMain
            }
            isHotItem
          }
          count
        }
      }
    `,
    variables: {
      search: productsState.filters.searchFilter,
      colors: productsState.filters.colorsFilter,
      patterns: productsState.filters.patternsFilter,
      price: productsState.filters.priceFilter,
      category: productsState.filters.categoryFilter,
      models: productsState.filters.modelsFilter,
      skip:
        tableState.pagination.currentPage * tableState.pagination.rowsPerPage,
      limit: tableState.pagination.rowsPerPage,
      basePrice: productsState.sorting.sortByPrice || undefined,
      rate: productsState.sorting.sortByRate || undefined,
      purchasedCount: productsState.sorting.sortByPopularity || undefined
    }
  });
  return result.data.getProducts;
};

const getAllFilters = async () => {
  const result = await client.query({
    query: gql`
      query {
        getProducts {
          items {
            colors {
              name {
                value
              }
              simpleName {
                value
              }
            }
            basePrice {
              value
            }
            model {
              value
            }
            pattern {
              value
            }
            category {
              _id
              name {
                value
              }
              isMain
            }
          }
        }
      }
    `
  });
  return result.data.getProducts.items;
};

export { getAllProducts, getAllFilters };
