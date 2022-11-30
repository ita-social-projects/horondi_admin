import { setItems, getItems } from '../../utils/client';

const getAllProductsDataForDeleteValidation = async (
  limit = 100,
  skip = 0,
  filter = {},
  sort = {},
  search = ''
) => {
  const query = `
      query(
         $skip: Int
        $limit: Int
        $filter: FilterInput
        $sort: SortInput
        $search:String
      ) {
        getProducts(
          filter: $filter
        skip: $skip
        limit: $limit
        sort: $sort
        search:$search
      ) {
        ... on PaginatedProducts {
            items {
              _id
              name {
                value
              }
              model {
                _id
                sizes {
                  _id
                }
              }
              pattern {
                _id
               }
               closure {
                _id
               }
              mainMaterial {
                material {
                  _id
                }
              }
              bottomMaterial {
                material {
                  _id
                }
              }
              backMaterial {
                material {
                  _id
                }
              }
              innerMaterial {
                material {
                  _id
                }
              }
              category {
                _id
              }
            }
            count
          }
        }
      }
`;

  const result = await getItems(query, {
    limit,
    sort,
    skip,
    filter,
    search
  });

  return result?.data?.getProducts;
};

const getAllProducts = async (
  limit = 10,
  skip = 0,
  filter = {},
  sort = {},
  search = ''
) => {
  const query = `
      query(
        $skip: Int
        $limit: Int
        $filter: FilterInput
        $sort: SortInput
        $search:String
      ) {
        getProducts(
          filter: $filter
          skip: $skip
          limit: $limit
          sort: $sort
          search:$search
        ) {
          ... on PaginatedProducts {
            items {
              _id
              purchasedCount
              name {
                lang
                value
              }
              basePrice
              model {
					_id
                name {
                  value
                }
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
              pattern {
                name {
                  lang
                  value
                }
              }
              mainMaterial {
                material {
                  _id
                  name {
                    lang
                    value
                  }
                }
              }
              category {
                _id
                name {
                  value
                }
              }
            sizes {
              size {
                _id
                name
              }
              price
            }
              isHotItem
            }
            count
          }
        }
      }
    `;

  const result = await getItems(query, {
    limit,
    sort,
    skip,
    filter,
    search
  });

  return result?.data?.getProducts;
};

const getAllFilters = async () => {
  const query = `
      query {
        getProducts {
          ... on PaginatedProducts {
            items {
              basePrice 
              model {
                name {
                  value
                }
              }
              pattern {
                name {
                  lang
                  value
                }
              }
              category {
                _id
                name {
                  value
                }
              }
            }
         count

          }
        }
      }
    `;
  const result = await getItems(query);

  return result?.data?.getProducts.items;
};

const getProductDetails = async () => {
  const query = `
   
      query {
          getAllModels {
          items {
            _id
            name {
              lang
              value
            }
            category {
              _id
              name {
                value
                lang
              }
            }
            images {
              large
              medium
              small
              thumbnail
            }
            priority
            show
            description {
              value
              lang
            }
          }
          count
        }
        getAllClosure {
          items {
            _id
            name {
              value
            }
          }
        }
        getAllPatterns {
          items {
            _id
            name {
              value
            }
          }
        }
        getCategoriesWithModels {
          _id
          name {
            value
          }
          models {
            _id
            name {
              value
            }
            sizes {
              _id
              name
            }
          }
        }
        getMaterialsByPurpose(purposes: [BASIC, INNER, BOTTOM, BACK]) {
          basic {
            _id
            name {
              value
            }
            colors {
              _id
              name {
                value
              }
            }
          }
          bottom {
            _id
            name {
              value
            }
            colors {
              _id
              name {
                value
              }
            }
          }
          inner {
            _id
            name {
              value
            }
            colors {
              _id
              name {
                value
              }
            }
          }
          back {
            _id
            name {
              value
            }
            colors {
              _id
              name {
                value
              }
            }
          }
        }
      }
    `;

  const result = await getItems(query);

  return {
    closures: result?.data?.getAllClosure.items,
    patterns: result?.data?.getAllPatterns.items,
    categories: result?.data?.getCategoriesWithModels,
    materials: result?.data?.getMaterialsByPurpose,
    models: result?.data?.getAllModels.items
  };
};

const getProductCategories = async () => {
  const query = `
      query {
        getAllCategories {
          _id
          name {
            lang
            value
          }
        }
      }
    `;
  const result = await getItems(query);

  return result?.data?.getAllCategories;
};

const getModelsByCategory = async (id) => {
  const query = `
      query($id: ID!) {
        getModelsByCategory(id: $id) {
          _id
          name {
            lang
            value
          }
        }
      }
    `;

  const result = await getItems(query, { id });

  return result?.data?.getModelsByCategory;
};

const addProduct = async (product, upload) => {
  const result = `
      mutation($product: ProductInput!, $upload: Upload!) {
        addProduct(product: $product, upload: $upload) {
          ... on Product {
            _id
          }
          ... on Error {
            message
            statusCode
          }
        }
      }
    `;

  return setItems(result, {
    product,
    upload
  });
};

const deleteManyProducts = async (payload) => {
  const result = `
      mutation($ids: [ID!]) {
        deleteProducts(ids: $ids) {
          ... on Product {
            _id
          }
        }
      }
    `;

  return setItems(result, {
    ids: payload
  });
};

const getProduct = async (id) => {
  const query = `
      query($id: ID!) {
        getProductById(id: $id) {
          ... on Product {
              _id
              category {
                _id
                name {
                  lang
                  value
                }
              }
              model {
                _id
                name {
                  value
                }
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
                material {
                  _id
                  name {
                    lang
                    value
                  }
                }
                color {
                  _id
                  colorHex
                  simpleName {
                    value
                    lang
                  }
                  name {
                    value
                    lang
                  }
                }
              }
              innerMaterial {
                material {
                  _id
                  name {
                    lang
                    value
                  }
                }
                color {
                  _id
                  colorHex
                  simpleName {
                    value
                    lang
                  }
                  name {
                    value
                    lang
                  }
                }
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
              pattern {
                _id
                name {
                  lang
                  value
                }
              }
              closure {
                _id
                name {
                  lang
                  value
                }
              }
              basePrice 
              sizes {
                size {
                  _id
                  name
                }
                price 
              }
              bottomMaterial {
                material {
                  _id
                  name {
                    lang
                    value
                  }
                }
                color {
                  _id
                  colorHex
                  simpleName {
                    value
                    lang
                  }
                  name {
                    value
                    lang
                  }
                }
              }
              isHotItem
              available
            }
        }
    }`;

  const result = await getItems(query, { id });

  return result?.data?.getProductById;
};

const updateProduct = async (payload, upload, primaryImageUpload) => {
  const result = `
      mutation(
        $id: ID!
        $product: ProductInput!
        $upload: Upload
        $primary: Upload
      ) {
        updateProduct(
          id: $id
          product: $product
          upload: $upload
          primary: $primary
        ) {
          ... on Product {
            _id
          }
          ... on Error {
            message
            statusCode
          }
        }
      }
    `;
  return setItems(result, {
    id: payload.id,
    product: payload.product,
    upload: !!upload.length && upload,
    primary: primaryImageUpload || undefined
  });
};

const deleteImages = async (id, images) => {
  const query = `
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
    `;

  const result = await setItems(query, { id, images });

  return result?.data?.deleteImages;
};

export {
  getAllProducts,
  getAllProductsDataForDeleteValidation,
  deleteManyProducts,
  getAllFilters,
  getProductCategories,
  getModelsByCategory,
  addProduct,
  getProduct,
  updateProduct,
  deleteImages,
  getProductDetails
};
