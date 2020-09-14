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
      skip: tableState.currentPage * tableState.rowsPerPage,
      limit: tableState.rowsPerPage,
      basePrice: productsState.sortByPrice || undefined,
      category: productsState.filters.categoryFilter,
      purchasedCount: productsState.sortByPopularity || undefined,
      models: productsState.filters.modelsFilter
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
              available
              code
              images {
                medium
                large
                small
                thumbnail
              }
              name {
                lang
                value
              }
              simpleName {
                lang
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
            options {
              additions {
                name {
                  lang
                  value
                }
                additionalPrice {
                  value
                  currency
                }
              }
            }
          }
        }
      }
    `
  });
  return result.data.getProducts.items;
};

const getProductCategories = async () => {
  const result = await client.query({
    query: gql`
      query {
        getAllCategories {
          _id
          name {
            lang
            value
          }
          subcategories
          isMain
        }
      }
    `
  });
  return result.data.getAllCategories;
};

const getProductOptions = async () => {
  const result = await client.query({
    query: gql`
      query {
        getProductOptions {
          sizes {
            _id
            name
            heightInCm
            widthInCm
            depthInCm
            volumeInLiters
            additionalPrice {
              value
              currency
            }
          }
          bottomMaterials {
            _id
            name {
              lang
              value
            }
            additionalPrice {
              value
              currency
            }
          }
        }
      }
    `
  });
  return result.data.getProductOptions;
};

const getModelsByCategory = async (payload) => {
  const result = await client.query({
    query: gql`
      query($id: ID!) {
        getModelsByCategory(id: $id) {
          _id
          name {
            lang
            value
          }
        }
      }
    `,
    variables: {
      id: payload
    }
  });
  await client.resetStore();
  return result.data.getModelsByCategory;
};

const addProduct = async (payload) => {
  const result = await client.mutate({
    mutation: gql`
      mutation($product: ProductInput!) {
        addProduct(product: $product) {
          ... on Product {
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
        }
      }
    `,
    variables: {
      product: payload
    }
  });
  await client.resetStore();
  return result.data.addProduct;
};

const deleteProduct = async (payload) => {
  const result = await client.mutate({
    mutation: gql`
      mutation($id: ID!) {
        deleteProduct(id: $id) {
          ... on Product {
            _id
          }
        }
      }
    `,
    variables: {
      id: payload
    }
  });
  await client.resetStore();
  return result.data.deleteProduct._id;
};

export {
  getAllProducts,
  getAllFilters,
  getProductCategories,
  getProductOptions,
  getModelsByCategory,
  addProduct,
  deleteProduct
};
