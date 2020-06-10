import AdminService from './Admin-service';

class BrandsService extends AdminService {
  getAllBrands = async () => {
    const brands = await this.getResource('brands');
    return brands;
  };

  getBrandById = async (id) => {
    const brand = await this.getResource(`brands/${id}`);
    return brand;
  };

  postBrand = async (brand) => {
    const res = await this.postData('brands', brand);
    return res;
  };

  putBrand = async (brand) => {
    const res = await this.putData(`brands/${brand._id}`, { brand });
    return res;
  };

  deleteBrand = async (id) => {
    const res = await this.deleteResource(`brands/${id}`);
    return res;
  };
}

const brandsService = new BrandsService();

export default brandsService;
