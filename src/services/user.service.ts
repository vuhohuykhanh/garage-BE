import moment = require('moment');
import { IsNull } from 'typeorm';
import { AppDataSource } from '../data-source';
import { User } from '../entity';
import { success, error, isEmptyObject } from '../util';

class UserService {
  // get all user
  async getAll(_, res) {
    const result = await AppDataSource.getRepository(User).find();
    return res.send(result);
  }

  //create user
  async create(req, res) {
    if (isEmptyObject(req.body)) {
      return error({ res, message: 'Empty data' });
    } else {
      const { dob, ...rest } = req.body;
      const repo = await AppDataSource.getRepository(User);
      repo.save(
        repo.create({
          ...rest,
          dob: dob || null,
        })
      );
      return success({ res, message: 'Create user success' });
    }
  }

  //update
  async update(req, res) {
    const { idCardNumber: id, ...updateInfo } = req.body;
    const user = await AppDataSource.getRepository(User).findOne({
      where: { idCardNumber: id, deleteAt: IsNull() },
    });
    if (!user) {
      return error({
        res,
        message: 'User not found',
      });
    }
    await AppDataSource.getRepository(User).save({
      ...user,
      ...updateInfo,
    });
    return success({
      res,
      message: 'Update user success',
    });
  }

  //delete user
  async delete(req, res) {
    const user = await AppDataSource.getRepository(User).findOne({
      where: { idCardNumber: req.params.id },
    });

    if (!user) {
      return error({
        res,
        message: 'User not found',
      });
    }

    await AppDataSource.getRepository(User).save({
      ...user,
      deleteAt: moment().format(),
    });

    return success({
      res,
      message: 'Delete user success',
    });
  }
}

export default new UserService();
