import { AppDataSource } from '../data-source';
import { Manufacturer } from '../entity';
import { error, success } from '../util';

class ManufacturerService {
  async getAll(_, res) {
    const result = await AppDataSource.getRepository(Manufacturer).find();
    return res.send(result);
  }

	async create(req, res) {
    if (!req.body.manufacturerName) {
      error({ res, message: 'Empty data' });
    } else {
      const repo = await AppDataSource.getRepository(Manufacturer);
      const acc = new Manufacturer();
      acc.name = req.body.manufacturerName;
      repo.save(acc);
      success({
				res,
				message: 'Create success',
			});
    }
  }
}

export default new ManufacturerService();
