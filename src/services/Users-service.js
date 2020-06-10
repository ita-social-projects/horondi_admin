import AdminService from './Admin-service';

class UsersService extends AdminService {
  getAllUsers = async () => {
    const res = await this.getResource('users');
    return res;
  };

  getUserById = async (id) => {
    const res = await this.getResource(`users/${id}`);
    return res;
  };

  putUser = async (user) => {
    const res = await this.putData(`users/${user.id}`, user);
    return res;
  };

  putUserRole = async (user) => {
    const res = await this.putData(`users/role/${user._id}`, { user });
    return res;
  };

  loginAdmin = async (user) => {
    const res = await this.postData(`auth/admin/login`, user);
    return res;
  };
}

const usersService = new UsersService();

export default usersService;
