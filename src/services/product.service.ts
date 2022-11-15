import { AppDataSource } from '../data-source';
import { Product } from '../entity';

class ProductService {
  async getAll(_, res) {
    const result = await AppDataSource.getRepository(Product).find();
    return res.send(result);
  }
}

export default new ProductService();