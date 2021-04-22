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
  const { data } = await getItems(query, { skip, limit });

  return data.getAllSlides;
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

  const { data } = await getItems(query, { id });

  if (Object.keys(slidesTranslations).includes(data.getSlideById?.message)) {
    throw new Error(`${slidesTranslations[data.getSlideById.message]}`);
  }

  return data.getSlideById;
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
  const { data } = await getItems(query);

  return data.getAllSlides;
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

  const { data } = await setItems(query, payload);

  if (Object.keys(slidesTranslations).includes(data.addSlide?.message)) {
    throw new Error(`${slidesTranslations[data.addSlide.message]}`);
  }

  return data.addSlide;
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

  const { data } = await setItems(query, payload);

  if (Object.keys(slidesTranslations).includes(data.updateSlide?.message)) {
    throw new Error(
      `${data.updateSlide.statusCode} ${
        slidesTranslations[data.updateSlide.message]
      }`
    );
  }

  return data.updateSlide;
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

  const { data } = await setItems(query, { id });

  if (Object.keys(slidesTranslations).includes(data.deleteSlide?.message)) {
    throw new Error(`${slidesTranslations[data.deleteSlide.message]}`);
  }

  return data.deleteSlide;
};
