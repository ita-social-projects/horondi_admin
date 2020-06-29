import { gql } from 'apollo-boost';
import client from './client';

class NewsService {
  getAllNews = () => {
    const news = client.query({
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
    return news;
  };

  getNewsItemById = (id) => {
    const query = gql`
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
    `;
    const newsItem = client.query({
      variables: { id },
      query
    });
    return newsItem;
  };

  deleteNewsItem = async (id) => {
    const mutation = gql`
      mutation($id: ID!) {
        deleteNews(id: $id) {
          author {
            name {
              value
            }
          }
        }
      }
    `;
    client.mutate({
      variables: { id },
      mutation
    });
    client.resetStore();
  };

  createNewsItem = async (news) => {
    const mutation = gql`
      mutation($news: NewsInput!) {
        addNews(news: $news) {
          video
        }
      }
    `;
    client.mutate({
      variables: {
        news
      },
      mutation
    });
    client.resetStore();
  };

  updateNewsItem = async (id, news) => {
    const mutation = gql`
      mutation($id: ID!, $news: NewsInput!) {
        updateNews(id: $id, news: $news) {
          video
        }
      }
    `;
    client.mutate({
      variables: {
        id,
        news
      },
      mutation
    });
    client.resetStore();
  };
}

const newsService = new NewsService();

export default newsService;
