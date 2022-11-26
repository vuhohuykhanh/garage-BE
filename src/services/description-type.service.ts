import { AppDataSource } from '../data-source';
import { DescriptionType } from '../entity';
import { error, isEmptyObject, success } from '../util';

class DescriptionTypeService {
  //get all
  async getAll(_, res) {
    const result = await AppDataSource.getRepository(DescriptionType).find();
    return res.send(result);
  }

  async create(req, res) {
    if (isEmptyObject(req.body)) {
      return error({
        res,
        message: 'Please fill body data',
      });
    } else {
      const descriptionTypeRepo = await AppDataSource.getRepository(
        DescriptionType
      );
      const result = await descriptionTypeRepo.save(
        descriptionTypeRepo.create({
          name: req.body.type,
        })
      );

      return success({
        res,
        message: result,
      });
    }
  }
}

export default new DescriptionTypeService();
