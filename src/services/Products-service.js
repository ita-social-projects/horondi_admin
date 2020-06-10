import AdminService from './Admin-service';

const productsPath = 'products';

class ProductsService extends AdminService {
  getAllProducts = async (currentpage, postsperpage) => {
    const catalogs = await this.getResource(
      `products?currentpage=${currentpage}&postsperpage=${postsperpage}`
    );
    return catalogs;
  };

  getProductById = async (id) => {
    const product = await this.getResource(`${productsPath}/${id}`);
    return product[0];
  };

  getProductPropetries = async (id) => {
    const product = await this.getResource(`${productsPath}/${id}`);

    const { propetries } = product[0];
    return propetries;
  };

  getProductsByFilter = async (currentpage, postsperpage, filters, search) => {
    let queryString = `${productsPath}?currentpage=${currentpage}&postsperpage=${postsperpage}`;
    const { brand, color, category, catalog } = filters;
    const searchTerm = search.toLowerCase();
    if (brand) {
      queryString = `${queryString}&brand=${brand}`;
    }
    if (color) {
      queryString = `${queryString}&color=${color}`;
    }
    if (category) {
      queryString = `${queryString}&category=${category}`;
    }
    if (catalog) {
      queryString = `${queryString}&catalog=${catalog}`;
    }
    if (search) {
      queryString = `${queryString}&searchTerm=${searchTerm}`;
    }
    const products = await this.getResource(queryString);
    return products;
  };

  putProduct = async (id, product) => {
    const res = await this.putData(`${productsPath}/${id}`, { product });
    return res;
  };

  postProduct = async (product) => {
    const url = `${productsPath}/`;
    const newProduct = await this.postData(url, product);
    return newProduct;
  };

  removeProduct = async (id) => {
    const res = await this.deleteResource(`${productsPath}/${id}`);
    return res;
  };
}

const productsService = new ProductsService();

export default productsService;
