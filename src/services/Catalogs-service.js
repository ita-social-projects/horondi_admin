import AdminService from './Admin-service';

class CatalogsService extends AdminService {
  getAllCatalogs = async () => {
    const catalogs = await this.getResource('catalogs');
    return catalogs;
  };

  getCatalogById = async (id) => {
    const catalogs = await this.getResource(`catalogs/${id}`);
    return catalogs;
  };

  getCatalogByName = async (catalogName) => {
    const catalogs = await this.getResource(`catalogs/?catalog=${catalogName}`);
    return catalogs;
  };

  getCatalogCategories = async (catalogName) => {
    const catalogs = await this.getResource(`catalogs/?catalog=${catalogName}`);
    const { categories } = catalogs[0];
    return categories;
  };

  putCatalog = async (id, catalog) => {
    const res = await this.putData(`catalogs/${id}`, { catalog });
    return res;
  };
}

const catalogsService = new CatalogsService();

export default catalogsService;
