import AdminService from './Admin-service';

class ColorsService extends AdminService {
  getAllColors = async () => {
    const colors = await this.getResource('colors');
    return colors;
  };
}

const colorsService = new ColorsService();

export default colorsService;
