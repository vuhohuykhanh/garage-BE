import { AppDataSource } from '../data-source';
import { Status } from '../entity';
import { error, success } from '../util';

class StatusService {
  async getAll(_, res) {
    const result = await AppDataSource.getRepository(Status).find();
    return res.send(result);
  }

	async create(req, res) {
    if (!req.body.statusName) {
      error({ res, message: 'Empty data' });
    } else {
      const repo = await AppDataSource.getRepository(Status);
      const acc = new Status();
      acc.name = req.body.statusName;
      repo.save(acc);
      success({
        res,
        message: 'Create success',
      });
    }
  }
}

export default new StatusService();