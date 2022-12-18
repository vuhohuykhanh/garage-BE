import { AppDataSource } from '../data-source';
import { Sale } from '../entity';
import { error, isEmptyObject, success } from '../util';

class SaleService {
  // get all sale
  async getAll(_, res) {
    const result = await AppDataSource.getRepository(Sale).find({
			order: {
				id: "DESC"
			}
		});
    return res.send(result);
  }

  // post creat sale
  async create(req, res) {
    if (isEmptyObject(req.body)) {
      return error({
        res,
        message: 'Please fill body data',
      });
    }
    const saleRepo = await AppDataSource.getRepository(Sale);
    const sale = await saleRepo.save(
      saleRepo.create({
        ...req.body,
      })
    );
    return success({
      res,
      message: 'Thêm đợt khuyến mãi thành công',
    });
  }
}

export default new SaleService();
