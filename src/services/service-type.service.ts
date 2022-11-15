import { AppDataSource } from '../data-source';
import { ServiceType } from '../entity';
import { error, success } from '../util';

class ServiceTypeService {
  async getAll(_, res) {
    const result = await AppDataSource.getRepository(ServiceType).find();
    return res.send(result);
  }

  async create(req, res) {
    if (!req.body.serviceTypeName) {
      error({ res, message: 'Empty data' });
    } else {
      const repo = await AppDataSource.getRepository(ServiceType);
      const acc = new ServiceType();
      acc.name = req.body.serviceTypeName;
      repo.save(acc);
      success({
        res,
        message: 'Create success',
      });
    }
  }
}

export default new ServiceTypeService();
