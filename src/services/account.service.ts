import { AppDataSource } from '../data-source';
import { Account, User, Role } from '../entity';
import { isEmptyObject, error, success } from '../util';

class AccountService {
  async getAll(_, res) {
    const result = await AppDataSource.getRepository(Account).find({
      relations: ['user', 'role'],
    });
    return res.send(result);
  }

	async getAllUser(_, res) {
    const result = await AppDataSource.getRepository(Account).find({
      relations: ['user', 'role'],
			where: {
				role: {
					roleName: "User"
				}
			}
    });
    return res.send(result);
  }

  //sign in
  async signIn(req, res) {
    if (isEmptyObject(req.body)) {
      return error({
        res,
        message: 'Empty data',
      });
    }

    const { username, password } = req.body;
    const account = await AppDataSource.getRepository(Account).findOne({
      where: {
        username,
      },
    });
    if (!account) {
      return error({
        res,
        message: 'Account not found',
      });
    }
    const validPassword = account.comparePassword(password);
    if (!validPassword) {
      return error({
        res,
        message: 'Wrong password',
      });
    }

    return success({
      res,
      message: { accessToken: account.generateJWT() },
    });
  }

	//sign in with role admin
  async signInAdmin(req, res) {
    if (isEmptyObject(req.body)) {
      return error({
        res,
        message: 'Empty data',
      });
    }

    const { username, password } = req.body;
    const account = await AppDataSource.getRepository(Account).findOne({
			relations: ['role'],
      where: {
        username,
				role: {
					roleName: 'Employee'
				}
      },
    });

    if (!account) {
      return error({
        res,
        message: 'Account not found',
      });
    }
    const validPassword = account.comparePassword(password);
    if (!validPassword) {
      return error({
        res,
        message: 'Wrong password',
      });
    }

    return success({
      res,
      message: { accessToken: account.generateJWT() },
    });
  }

  // sign up
  async signUp(req, res) {
    if (isEmptyObject(req.body)) {
      return error({
        res,
        message: 'Empty data',
      });
    }
    const {
      username,
      password,
      dob,
      idCardNumber,
      name,
      address,
      //avatar,
      email,
      phoneNumber,
    } = req.body;

    //create user
    const userRepo = await AppDataSource.getRepository(User);
    const accountRepo = await AppDataSource.getRepository(Account);

    const existEmail = await accountRepo.findOne({
      where: { username: username },
    });
    const existIdCardNumber = await userRepo.findOne({
      where: { idCardNumber: idCardNumber },
    });

    if (existEmail) {
      return error({
        res,
        message: 'Tài khoản này đã tồn tại, vui lòng nhập lại',
      });
    }
    if (existIdCardNumber) {
      return error({
        res,
        message: 'Số CMND này đã tồn tại, vui lòng nhập lại',
      });
    }

    const role = await AppDataSource.getRepository(Role).findOne({
      where: { roleName: 'User' },
    });

    //create user
    const user = userRepo.create({
      name,
      address,
      //avatar,
      email,
      phoneNumber,
      idCardNumber: idCardNumber,
      dob: dob || null,
    });
    await userRepo.save(user);

    //create account relate user
    const account = new Account();
    account.username = username;
    account.password = account.createPassword(password);
    account.purchaseCount = 0;
    account.user = user;
    account.role = role;

    await accountRepo.save(account);

    return success({
      res,
      message: "Create account success",
    });
  }

  async forgotPassword(req, res) {
    if (isEmptyObject(req.body)) {
      return error({
        res,
        message: 'Empty data',
      });
    }
    const { username, idCardNumber, newPassword } = req.body;
    const accountRepo = await AppDataSource.getRepository(Account);
    const userRepo = await AppDataSource.getRepository(User);

    const user = await userRepo.findOne({
      where: {
        idCardNumber,
      },
    });
    const account = await accountRepo.findOne({
      where: {
        username: username,
      },
      relations: ['user'],
    });

    if (!user) {
      return error({
        res,
        message: 'This user not exist',
      });
    }
    if (!account) {
      return error({
        res,
        message: 'This account not exist',
      });
    }
    if (account.user.id !== user.id) {
      return error({
        res,
        message: 'This account and this user is not match',
      });
    }

    account.password = account.createPassword(newPassword);
    await accountRepo.save(account);

    return success({
      res,
      message: "Đổi mật khẩu thành công",
    });
  }
}

export default new AccountService();
