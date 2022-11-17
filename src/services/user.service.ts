import moment = require('moment');
import { IsNull } from 'typeorm';
import { AppDataSource } from '../data-source';
import { Account, User } from '../entity';
import { success, error, isEmptyObject } from '../util';

var jwt = require('jsonwebtoken');

class UserService {
  // get all user
  async getAll(_, res) {
    const result = await AppDataSource.getRepository(User).find();
    return res.send(result);
  }

	//get user information
	async getUserInfo(req, res){
		if(!req.headers.authorization){
			return error({
        res,
        message: 'Please fill authorization',
      });
		}
		const authorization = req.headers.authorization.split(' ')[1];
		const decoded = jwt.verify(authorization, "GarageLink");
		const userRepo = await AppDataSource.getRepository(User);
		const user = await userRepo.findOne({
			relations: ["account"],
			where: {
				account: {
					username: decoded?.username
				}
			}
		})
		res.send(user);
	}

		// get all account role user
		async getAllUser(_, res){
			const account = await AppDataSource.getRepository(Account).find({
				relations: ["role", "user"],
				where: {
					role: {
						roleName: "User",
					}
				}
			})
			return success({
				res,
				message: account,
			})
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

  //update password
  async updatePassword(req, res) {
		if (isEmptyObject(req.body)) {
      return error({
        res,
        message: 'Empty data',
      });
    }
		const {idCardNumber, password, newPassword} = req.body;

		const accountRepo = await AppDataSource.getRepository(Account);
		const account = await accountRepo.findOne({
			relations: ["user"],
			where: {
				user: {
					idCardNumber: idCardNumber
				}
			}
		});

		if(!account){
			return error({
        res,
        message: 'Account not found with this idCardNumber',
      });
		}

		const validPassword = account.comparePassword(password);
		if(!validPassword){
			return error({
        res,
        message: 'Wrong Old password',
      });
		}
		
		account.password = account.createPassword(newPassword);
		accountRepo.save(account);
		return success({
			res,
			message: 'Change password success'
		})
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
