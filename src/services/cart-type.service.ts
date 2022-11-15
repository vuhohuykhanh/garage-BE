import { AppDataSource } from '../data-source';
import { CartType } from '../entity';
import { error, success } from '../util';

class CartTypeService {
  async getAll(_, res) {
    const result = await AppDataSource.getRepository(CartType).find();
    return res.send(result);
  }

	async create(req, res) {
    if (!req.body.cartTypeName) {
      error({ res, message: 'Empty data' });
    } else {
      const repo = await AppDataSource.getRepository(CartType);
      const acc = new CartType();
      acc.name = req.body.cartTypeName;
      repo.save(acc);
      success({
        res,
        message: 'Create success',
      });
    }
  }
}

export default new CartTypeService();
