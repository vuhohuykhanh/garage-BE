import { AppDataSource } from '../data-source';
import { ProductType } from '../entity';
import { error, success } from '../util';

class ProductTypeService {
  async getAll(_, res) {
    const result = await AppDataSource.getRepository(ProductType).find();
    return res.send(result);
  }

	async create(req, res) {
    if (!req.body.productTypeName) {
      error({ res, message: 'Empty data' });
    } else {
      const repo = await AppDataSource.getRepository(ProductType);
      const acc = new ProductType();
      acc.name = req.body.productTypeName;
      repo.save(acc);
      success({
        res,
        message: 'Create success',
      });
    }
  }
}

export default new ProductTypeService();
