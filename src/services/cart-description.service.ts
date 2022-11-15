import { AppDataSource } from '../data-source';
import { CartDescription } from '../entity';

class CartDescriptionService {
  async getAll(_, res) {
    const result = await AppDataSource.getRepository(CartDescription).find();
    return res.send(result);
  }
}

export default new CartDescriptionService();
