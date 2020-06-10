import AdminService from './Admin-service';

class CategoriesService extends AdminService {
  getAllCategories = async () => {
    const categories = await this.getResource('categories');
    return categories;
  };

  getCategoryById = async (id) => {
    const category = await this.getResource(`categories/${id}`);
    return category;
  };

  putCategory = async (category) => {
    const res = await this.putData(`categories/${category.id}`, category);
    return res;
  };

  postCategory = async (category) => {
    const res = await this.postData('categories', category);
    return res;
  };

  delteCategory = async (id) => {
    const res = await this.deleteResource(`categories/${id}`);
    return res;
  };
}

const categoriesService = new CategoriesService();

export default categoriesService;
