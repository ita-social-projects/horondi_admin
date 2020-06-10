import AdminService from './Admin-service';

class OrdersService extends AdminService {
  getAllOrders = async () => {
    const orders = await this.getResource('orders');
    return orders;
  };

  getOrderById = async (id) => {
    const order = await this.getResource(`orders/${id}`);
    return order;
  };

  putOrder = async (id, order) => {
    const res = await this.putData(`orders/${id}`, { order });
    return res;
  };
}

const ordersService = new OrdersService();

export default ordersService;
