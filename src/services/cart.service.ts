import { AppDataSource } from '../data-source';
import { Cart } from '../entity';

class CartService {
  async getAll(_, res) {
    const result = await AppDataSource.getRepository(Cart).find();
    return res.send(result);
  }
}

export default new CartService();
