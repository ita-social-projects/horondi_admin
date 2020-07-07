import ApolloClient, { gql } from 'apollo-boost';

export const REACT_APP_API_URL =
  window.env && window.env.REACT_APP_API_URL
    ? window.env.REACT_APP_API_URL
    : process.env.REACT_APP_API_URL;

const client = new ApolloClient({
  uri: process.env.REACT_APP_BASE_URI
});

const getAllNews = () =>
  client.query({
    query: gql`
      {
        getAllNews {
          _id
          author {
            name {
              lang
              value
            }
            image {
              small
            }
          }
          title {
            lang
            value
          }
        }
      }
    `
  });

const getNewsItemById = (id) =>
  client.query({
    variables: { id },
    query: gql`
      query($id: ID!) {
        getNewsById(id: $id) {
          title {
            lang
            value
          }
          text {
            lang
            value
          }
          images {
            primary {
              large
            }
            additional {
              large
            }
          }
          video
          author {
            name {
              lang
              value
            }
            image {
              large
            }
          }
          date
        }
      }
    `
  });

const deleteNewsItem = (id) => {
  client.mutate({
    variables: { id },
    mutation: gql`
      mutation($id: ID!) {
        deleteNews(id: $id) {
          author {
            name {
              value
            }
          }
        }
      }
    `
  });
};

const createNewsItem = (news) =>
  client.mutate({
    mutation: gql`
      mutation($news: NewsInput!) {
        addNews(news: $news) {
          video
        }
      }
    `,
    variables: { news }
  });

const updateNewsItem = (id, news) => {
  client.mutate({
    variables: {
      id,
      news
    },
    mutation: gql`
      mutation($id: ID!, $news: NewsInput!) {
        updateNews(id: $id, news: $news) {
          video
        }
      }
    `
  });
};

export {
  getAllNews,
  deleteNewsItem,
  getNewsItemById,
  createNewsItem,
  updateNewsItem
};
