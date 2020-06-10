import AdminService from './Admin-service';

class NewsService extends AdminService {
  getAllNews = async () => {
    const news = await this.getResource('news');
    return news;
  };

  getNewsItemById = async (id) => {
    const newsItem = await this.getResource(`news/${id}`);
    return newsItem;
  };

  postNewsItem = async (newsItem) => {
    const res = await this.postData('news', newsItem);
    return res;
  };

  putNewsItem = async (newsItem) => {
    const res = await this.putData(`news/${newsItem._id}`, newsItem);
    return res;
  };

  deleteNewsItem = async (id) => {
    const res = await this.deleteResource(`news/${id}`);
    return res;
  };
}

const newsService = new NewsService();

export default newsService;
