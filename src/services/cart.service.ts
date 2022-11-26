import { request } from 'express';
import moment = require('moment');
import { IsNull } from 'typeorm';
import { AppDataSource } from '../data-source';
import { Cart } from '../entity';
import { error, isEmptyObject, success } from '../util';

class CartService {
  //get-all
  async getAll(_, res) {
    const result = await AppDataSource.getRepository(Cart).find({
      relations: ['status', 'customer', 'approvalEmployee', 'cartDescriptions'],
      where: {
        deleteAt: IsNull(),
      },
    });
    return success({
      res,
      message: result,
    });
  }

  //get-all-with-delete
  async getAllWithDelete(_, res) {
    const result = await AppDataSource.getRepository(Cart).find({
      relations: ['status', 'customer', 'approvalEmployee', 'cartDescriptions'],
    });
    return success({
      res,
      message: result,
    });
  }

  //get-cart-by-id
  async getCartByUserId(req, res) {
    const { id } = req.query;
    const result = await AppDataSource.getRepository(Cart).find({
      relations: ['status', 'customer', 'approvalEmployee', 'cartDescriptions'],
      where: {
        customer: {
          id: id,
        },
      },
    });

    if (!result)
      return error({
        res,
        message: 'Cart not found',
      });

    return success({
      res,
      message: result,
    });
  }

  //create
  async create(req, res) {
    if (isEmptyObject(req.body))
      return error({
        res,
        message: 'Please fill body data',
      });

    const result = await AppDataSource.getRepository(Cart).save({
      ...req.body,
      status: 1,
    });

    return success({
      res,
      message: result,
    });
  }

  //update
  async update(req, res) {
    if (isEmptyObject(req.body))
      return error({
        res,
        message: 'Please fill body data',
      });

    const cart = await AppDataSource.getRepository(Cart).findOne({
      relations: ['status', 'customer', 'approvalEmployee', 'cartDescriptions'],
      where: {
        id: req.params.id,
        deleteAt: IsNull(),
      },
    });

    if (!cart)
      return error({
        res,
        message: 'Cart not found',
      });

    const cartUpdate = await AppDataSource.getRepository(Cart).save({
      ...cart,
      ...req.bod,
    });

    return success({
      res,
      message: cartUpdate,
    });
  }

  //update-status
  async updateStatus(req, res) {
    if (isEmptyObject(req.body))
      return error({
        res,
        message: 'Please fill body data',
      });

    const cart = await AppDataSource.getRepository(Cart).findOne({
      where: {
        id: req.params.id,
        deleteAt: IsNull(),
      },
    });

    if (!cart)
      return error({
        res,
        message: 'Cart not found',
      });

    const cartUpdateStatus = await AppDataSource.getRepository(Cart).save({
      ...cart,
      status: req.body.statusId,
    });

    return success({
      res,
      message: cartUpdateStatus,
    });
  }

  //delete
  async delete(req, res) {
    const cart = await AppDataSource.getRepository(Cart).findOne({
      where: {
        id: req.params.id,
        deleteAt: IsNull(),
      },
    });

    if (!cart)
      return error({
        res,
        message: 'Cart not found',
      });

    await AppDataSource.getRepository(Cart).save({
      ...cart,
      deleteAt: moment().format(),
    });

    return success({
      res,
      message: 'Delete cart success',
    });
  }
}

export default new CartService();
