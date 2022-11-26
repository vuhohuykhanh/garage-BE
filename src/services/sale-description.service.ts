import { AppDataSource } from '../data-source';
import { Product, Sale, SaleDescription } from '../entity';
import { error, isEmptyObject, success } from '../util';

class SaleDescriptionService {
  // get - all
  async getAll(_, res) {
    const result = await AppDataSource.getRepository(SaleDescription).find({
      relations: ['product', 'sale'],
    });
    return res.send(result);
  }

  //create
  async create(req, res) {
    if (isEmptyObject(req.body))
      return error({
        res,
        message: 'Please fill body data',
      });
    const { productId, saleId, salePercent } = req.body;

    const product = await AppDataSource.getRepository(Product).findOne({
      where: { id: productId },
    });
    if (!product)
      return error({
        res,
        message: 'Product not found',
      });

    const sale = await AppDataSource.getRepository(Sale).findOne({
      where: { id: saleId },
    });
    if (!sale)
      return error({
        res,
        message: 'Sale not found',
      });

    const saleDesRepo = await AppDataSource.getRepository(SaleDescription);
    const saleDes = new SaleDescription();
    saleDes.product = product;
    saleDes.sale = sale;
    saleDes.salePercent = salePercent;
    await saleDesRepo.save(saleDes);
    return success({
      res,
      message: saleDes,
    });
  }
}

export default new SaleDescriptionService();
