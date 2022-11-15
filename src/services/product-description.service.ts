import { AppDataSource } from '../data-source';
import { ProductDescription } from '../entity';

class ProductDescriptionService {
  async getAll(_, res) {
    const result = await AppDataSource.getRepository(ProductDescription).find();
    return res.send(result);
  }
}

export default new ProductDescriptionService();
