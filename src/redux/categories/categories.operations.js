import {getItems, setItems} from '../../utils/client';
import {categoryTranslations} from '../../translations/category.translations';

export const getAllCategories = async (filter, pagination, sort) => {
    const getAllCategoriesQuery = `
      query(
        $filter: FilterInputComponent
        $pagination: Pagination
        $sort: SortInputComponent
      ) {
        getAllCategories(
          filter: $filter
          pagination: $pagination
          sort: $sort
        ) {
          items {
            _id
            code
            name {
              lang
              value
            }
            images {
              large
              medium
              small
              thumbnail
            }
            available
          }
          count
        }
      }
    `;

    const {data} = await getItems(getAllCategoriesQuery, {
        filter,
        pagination,
        sort
    });

    return data.getAllCategories;
};
export const getCategoryById = async (id) => {
    const getCategoryByIdQuery = `
      query($id: ID!) {
        getCategoryById(id: $id) {
          ... on Category {
            _id
            name {
              lang
              value
            }
            code
            images {
              thumbnail
            }
          }
          ... on Error {
            message
            statusCode
          }
        }
      }
    `;

    const {data} = await getItems(getCategoryByIdQuery, {id});

    if (Object.keys(categoryTranslations).includes(data.getCategoryById?.message)) {
        throw new Error(
            `${data.getCategoryById.statusCode} ${
                categoryTranslations[data.getCategoryById.message]
            }`
        );
    }

    return data.getCategoryById;
};
export const deleteCategoryById = async (deleteId, switchId) => {
    const deleteCategoryByIdQuery = `
     mutation deleteCategory($deleteId: ID!, $switchId: ID!){
      deleteCategory(
      deleteId: $deleteId
      switchId: $switchId
      ) {
        ... on Category {
          _id
          code
        }
        ... on Error {
          statusCode
          message
        }
      }
    }
  `;

    const {data} = await setItems(deleteCategoryByIdQuery, {
        deleteId,
        switchId
    });

    return data.deleteCategory;
};
export const createCategory = async (payload) => {
    const query = `
      mutation($category: CategoryInput!, $upload: Upload!) {
        addCategory(category: $category, upload: $upload) {
          ... on Category {
            _id
          }
          ... on Error {
            statusCode
            message
          }
        }
      }
    `;
    const {data} = await setItems(query, payload);

    if (Object.keys(categoryTranslations).includes(data.addCategory?.message)) {
        throw new Error(
            `${data.addCategory.statusCode} ${
                categoryTranslations[data.addCategory.message]
            }`
        );
    }
    return data.addCategory;
};
export const updateCategory = async (payload) => {
    const query = `
      mutation updateCategory(
        $id: ID!
        $category: CategoryInput!
        $upload: Upload
      ) {
        updateCategory(id: $id, category: $category, upload: $upload) {
          ... on Category {
            _id
          }
          ... on Error {
            statusCode
            message
          }
        }
      }
    `;
    const {data} = await setItems(query, payload);

    if (Object.keys(categoryTranslations).includes(data.updateCategory?.message)) {
        throw new Error(
            `${data.updateCategory.statusCode} ${
                categoryTranslations[data.updateCategory.message]
            }`
        );
    }
    return data.updateCategory;
};
