import { AppDataSource } from '../data-source';
import { SaleDescription } from '../entity';

class SaleDescriptionService {
  async getAll(_, res) {
    const result = await AppDataSource.getRepository(SaleDescription).find();
    return res.send(result);
  }
}

export default new SaleDescriptionService();
