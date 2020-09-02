import { gql } from '@apollo/client';
import { client } from '../../utils/client';

const getAllProducts = async (state) => {
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
      search: state.filters.searchFilter,
      colors: state.filters.colorsFilter,
      patterns: state.filters.patternsFilter,
      price: state.filters.priceFilter,
      skip: state.currentPage * state.productsPerPage,
      limit: state.productsPerPage,
      basePrice: state.sortByPrice || undefined,
      category: state.filters.categoryFilter,
      purchasedCount: state.sortByPopularity || undefined,
      models: state.filters.modelsFilter
    }
  });
  return result.data.getProducts.items;
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
