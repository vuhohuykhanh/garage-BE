import { AppDataSource } from '../data-source';
import { AccessoryType } from '../entity';
import { success, error } from '../util';

class AccessoryTypeService {
  async getAll(_, res) {
    const result = await AppDataSource.getRepository(AccessoryType).find();
    return res.send(result);
  }

  async create(req, res) {
    if (!req.body.accessoryName) {
      error({ res, message: 'Empty data' });
    } else {
      const repo = await AppDataSource.getRepository(AccessoryType);
      const acc = new AccessoryType();
      acc.name = req.body.accessoryName;
      repo.save(acc);
      success({
				res,
				message: 'Create success',
			});
    }
  }
}

export default new AccessoryTypeService();
