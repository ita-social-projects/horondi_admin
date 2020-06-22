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
              name
              image {
                small
              }
            }
            title {
              value
            }
          }
        }
      `
    });
    return news;
  };

  deleteNewsItem = async (id) => {
    const mutation = gql`
      mutation($id: ID!) {
        deleteNews(id: $id) {
          author {
            name
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
}

const newsService = new NewsService();

export default newsService;
