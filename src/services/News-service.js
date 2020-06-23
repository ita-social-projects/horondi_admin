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

  createNewsItem = async (video, author, date) => {
    const mutation = gql`
      mutation(
        $video: String!
        $author: AuthorInput!
        $title: [LanguageInput!]
        $text: [LanguageInput!]
        $date: String!
        $images: [PrimaryImageInput!]
      ) {
        addNews(
          news: {
            video: $video
            author: $author
            title: $title
            text: $text
            date: $date
            images: $images
          }
        ) {
          video
        }
      }
    `;
    client.mutate({
      variables: {
        video,
        author,
        date
      },
      mutation
    });
  };
}

const newsService = new NewsService();

export default newsService;
