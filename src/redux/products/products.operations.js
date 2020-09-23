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
    },
    fetchPolicy: 'no-cache'
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
              subcategories
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
  return result.data.getModelsByCategory;
};

const productQuery = `
    ... on Product {
            _id
            category {
              _id
              name {
                lang
                value
              }
            }
            subcategory {
              _id
            }
            model {
              value
            }
            name {
              lang
              value
            }
            description {
              lang
              value
            }
            mainMaterial {
              lang
              value
            }
            innerMaterial {
              lang
              value
            }
            strapLengthInCm
            images {
              primary {
                large
                medium
                small
                thumbnail
              }
              additional {
                large
                medium
                small
                thumbnail
              }
            }
            colors {
              simpleName {
                lang
                value
              }
            }
            pattern {
              lang
              value
            }
            closure {
              lang
              value
            }
            basePrice {
              value
              currency
            }
            options {
              size {
                name
                heightInCm
                widthInCm
                depthInCm
                volumeInLiters
                available
                additionalPrice {
                  value
                  currency
                }
              }
              bottomMaterial {
                name {
                  lang
                  value
                }
                available
                additionalPrice {
                  value
                  currency
                }
              }
              additions {
                name {
                  lang
                  value
                }
                available
                additionalPrice {
                  value
                  currency
                }
              }
            }
          }
`;

const addProduct = async (state) => {
  const result = await client.mutate({
    mutation: gql`
      mutation($product: ProductInput!, $upload: Upload!) {
        addProduct(product: $product, upload: $upload) {
          ... on Product {
            _id
          }
        }
      }
    `,
    variables: {
      product: state.productToSend,
      upload: state.upload
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

const getProduct = async (payload) => {
  const result = await client.query({
    query: gql`
      query($id: ID!) {
        getProductById(id: $id) {
          ${productQuery}
        }
    }`,
    variables: {
      id: payload
    },
    fetchPolicy: 'no-cache'
  });
  return result.data.getProductById;
};

const updateProduct = async (payload, upload, primaryImageUpload) => {
  const result = await client.mutate({
    mutation: gql`
      mutation($id: ID!, $product: ProductInput!, $upload: Upload, $primary: Upload) {
        updateProduct(id: $id, product: $product, upload: $upload, primary: $primary) {
            ${productQuery}
        }
      }`,
    variables: {
      id: payload.id,
      product: payload.product,
      upload: upload.length ? upload : undefined,
      primary: primaryImageUpload || undefined
    }
  });
  return result.data.updateProduct;
};

const deleteImages = async (payload, images) => {
  const result = await client.mutate({
    mutation: gql`
        mutation($id: ID!, $images: [String!]!) {
          deleteImages(id: $id, images: $images) {
            primary {
              large
              medium
              small
              thumbnail
            }
            additional {
              large
              medium
              small
              thumbnail
            }
          }
        }
    `,
    variables: {
      id: payload,
      images
    }
  })
  return result.data.deleteImages
}

export {
  getAllProducts,
  getAllFilters,
  getProductCategories,
  getProductOptions,
  getModelsByCategory,
  addProduct,
  deleteProduct,
  getProduct,
  updateProduct,
  deleteImages
};
