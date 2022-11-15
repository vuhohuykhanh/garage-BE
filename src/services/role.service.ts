import { getRepository } from 'typeorm';
import { AppDataSource } from '../data-source';
import { Role } from '../entity';

class RoleService {
  //GET_ALL
  async getAll(_, res) {
    const result = await AppDataSource.getRepository(Role).find();
    return res.send(result);
  }

  //CREATE
  async create(req, res) {
    const roleRepo = await AppDataSource.getRepository(Role);
    if (!req.body.role) res.send(401, 'Role not found');
    else {
      const role = new Role();
      role.roleName = req.body.role;
      roleRepo.save(role);
			res.send(200, 'Create success')
    }
  }
}

export default new RoleService();
