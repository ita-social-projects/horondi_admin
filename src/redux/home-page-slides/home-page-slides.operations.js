import { gql } from '@apollo/client';
import { client } from '../../utils/client';
import { getFromLocalStorage } from '../../services/local-storage.service';
import { config } from '../../configs';
import { slidesTranslations } from '../../translations/home-page-slides.translations';

export const getAllSlides = async (skip, limit) => {
  const result = await client.query({
    variables: {
      skip,
      limit
    },
    query: gql`
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
    `
  });
  client.resetStore();
  return result.data.getAllSlides;
};

export const getSlideById = async (id) => {
  const result = await client.query({
    variables: { id },
    query: gql`
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
    `,
    fetchPolicy: 'no-cache'
  });
  const { data } = result;

  if (data.getSlideById.message) {
    throw new Error(`${slidesTranslations[data.getSlideById.message]}`);
  }

  return data.getSlideById;
};

export const getAllAvailableSlides = async () => {
  const result = await client.query({
    query: gql`
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
    `
  });
  return result.data.getAllSlides;
};

export const createSlide = async (payload) => {
  const token = getFromLocalStorage(config.tokenName);

  const result = await client.mutate({
    context: { headers: { token } },
    variables: payload,

    mutation: gql`
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
    `,
    fetchPolicy: 'no-cache'
  });
  client.resetStore();
  const { data } = result;

  if (data.addSlide.message) {
    throw new Error(`${slidesTranslations[data.addSlide.message]}`);
  }

  return data.addSlide;
};

export const updateSlide = async (payload) => {
  const token = getFromLocalStorage('HORONDI_AUTH_TOKEN');

  const result = await client.mutate({
    context: { headers: { token } },
    variables: payload,
    mutation: gql`
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
    `,
    fetchPolicy: 'no-cache'
  });
  client.resetStore();

  if (result.data.updateSlide.message) {
    throw new Error(
      `${result.data.updateSlide.statusCode} ${
        slidesTranslations[result.data.updateSlide.message]
      }`
    );
  }

  return result.data.updateSlide;
};

export const deleteSlide = async (id) => {
  const token = getFromLocalStorage(config.tokenName);

  const result = await client.mutate({
    context: { headers: { token } },
    variables: { id },
    mutation: gql`
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
    `,
    fetchPolicy: 'no-cache'
  });
  client.resetStore();
  const { data } = result;

  if (data.deleteSlide.message) {
    throw new Error(`${slidesTranslations[data.deleteSlide.message]}`);
  }

  return data.deleteSlide;
};
