import { getItems, setItems } from '../../utils/client';
import { slidesTranslations } from '../../translations/home-page-slides.translations';

export const getAllSlides = async (skip, limit) => {
  const query = `
      query($skip: Int, $limit: Int) {
        getAllSlides(skip: $skip, limit: $limit) {
          items {
            _id
            title {
              lang
              value
            }
            description {
              value
              lang
            }
            images {
              large
              thumbnail
            }
            link
            show
            order
          }
          count
        }
      }
    `;
  const result = await getItems(query, { skip, limit });

  return result?.data?.getAllSlides;
};
export const getSlideById = async (id) => {
  const query = `
      query($id: ID!) {
        getSlideById(id: $id) {
          ... on HomePageSlide {
            _id
            title {
              lang
              value
            }
            description {
              value
              lang
            }
            images {
              large
              thumbnail
            }
            link
            show
            order
          }
          ... on Error {
            message
            statusCode
          }
        }
      }
    `;

  const result = await getItems(query, { id });

  if (
    Object.keys(slidesTranslations).includes(
      result?.data?.getSlideById?.message
    )
  ) {
    throw new Error(`${slidesTranslations[result.data.getSlideById.message]}`);
  }

  return result?.data?.getSlideById;
};
export const getAllAvailableSlides = async () => {
  const query = `
      query {
        getAllSlides {
          items {
            _id
            title {
              lang
              value
            }
            description {
              value
              lang
            }
            images {
              small
            }
            link
            show
            order
          }
        }
      }
    `;
  const result = await getItems(query);

  return result?.data?.getAllSlides;
};
export const createSlide = async (payload) => {
  const query = `
      mutation($slide: HomePageSlideInput!, $upload: Upload) {
        addSlide(slide: $slide, upload: $upload) {
          ... on HomePageSlide {
            _id
          }
          ... on Error {
            statusCode
            message
          }
        }
      }
    `;

  const result = await setItems(query, payload);

  if (
    Object.keys(slidesTranslations).includes(result?.data?.addSlide?.message)
  ) {
    throw new Error(`${slidesTranslations[result.data.addSlide.message]}`);
  }

  return result?.data?.addSlide;
};
export const updateSlide = async (payload) => {
  const query = `
      mutation($id: ID!, $slide: HomePageSlideInput!, $upload: Upload) {
        updateSlide(id: $id, slide: $slide, upload: $upload) {
          ... on HomePageSlide {
            _id
            title {
              lang
              value
            }
            description {
              value
              lang
            }
            order
            show
            images {
              large
              small
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

  const result = await setItems(query, payload);

  if (
    Object.keys(slidesTranslations).includes(result?.data?.updateSlide?.message)
  ) {
    throw new Error(
      `${result.data.updateSlide.statusCode} ${
        slidesTranslations[result.data.updateSlide.message]
      }`
    );
  }

  return result?.data?.updateSlide;
};
export const deleteSlide = async (id) => {
  const query = `
      mutation($id: ID!) {
        deleteSlide(id: $id) {
          ... on HomePageSlide {
            title {
              value
            }
          }
          ... on Error {
            message
            statusCode
          }
        }
      }
    `;

  const result = await setItems(query, { id });

  if (
    Object.keys(slidesTranslations).includes(result?.data?.deleteSlide?.message)
  ) {
    throw new Error(`${slidesTranslations[result.data.deleteSlide.message]}`);
  }

  return result?.data?.deleteSlide;
};
