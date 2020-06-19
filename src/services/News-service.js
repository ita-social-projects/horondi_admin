// import AdminService from './Admin-service';
import { gql } from 'apollo-boost';
import client from './client';

class NewsService {
  getAllNews = () => {
    const news = client
      .query({
        query: gql`
          {
            allNews {
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
      })
      .then((result) => result);
    return news;
  };

  // getNewsItemById = async (id) => {
  //   const newsItem = await this.getResource(`news/${id}`);
  //   return newsItem;
  // };

  // postNewsItem = async (newsItem) => {
  //   const res = await this.postData('news', newsItem);
  //   return res;
  // };

  // putNewsItem = async (newsItem) => {
  //   const res = await this.putData(`news/${newsItem._id}`, newsItem);
  //   return res;
  // };

  // deleteNewsItem = async (id) => {
  //   const res = await this.deleteResource(`news/${id}`);
  //   return res;
  // };
}

const newsService = new NewsService();

export default newsService;
