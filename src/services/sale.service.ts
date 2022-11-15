import { AppDataSource } from '../data-source';
import { Sale } from '../entity';

class SaleService {
  async getAll(_, res) {
    const result = await AppDataSource.getRepository(Sale).find();
    return res.send(result);
  }
}

export default new SaleService();