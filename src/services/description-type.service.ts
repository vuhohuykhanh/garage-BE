import { AppDataSource } from '../data-source';
import { DescriptionType } from '../entity';

class DescriptionTypeService {
  async getAll(_, res) {
    const result = await AppDataSource.getRepository(DescriptionType).find();
    return res.send(result);
  }
}

export default new DescriptionTypeService();