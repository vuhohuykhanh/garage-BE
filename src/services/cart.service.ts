import { request } from 'express';
import moment = require('moment');
import { IsNull, Not } from 'typeorm';
import { AppDataSource } from '../data-source';
import { Account, Cart, CartDescription, Product, User } from '../entity';
import { error, isEmptyObject, success } from '../util';

class CartService {
  //get-all
  async getAll(_, res) {
    const result = await AppDataSource.getRepository(Cart).find({
      relations: ['status', 'customer', 'approvalEmployee', 'cartDescriptions'],
      where: {
        deleteAt: IsNull(),
      },
      order: {
        id: 'DESC',
      },
    });
    return success({
      res,
      message: result,
    });
  }

  //get-bill (delete at not null)
  async getBill(_, res) {
    const result = await AppDataSource.getRepository(Cart).find({
      relations: ['status', 'customer', 'approvalEmployee', 'cartDescriptions'],
      where: {
        deleteAt: Not(IsNull()),
      },
      order: {
        id: 'DESC',
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
    const { idCardNumber } = req.query;
    const result = await AppDataSource.getRepository(Cart).find({
      relations: ['status', 'customer', 'approvalEmployee', 'cartDescriptions'],
      where: {
        customer: {
          idCardNumber: idCardNumber,
        },
      },
			order: {
				id: "DESC"
			}
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
      //message: result,
      message: 'Create cart success',
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
      //message: cartUpdate,
      message: 'Update cart success',
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
        id: req.body.cartId,
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
      status: req.body.statusId,
    });

    return success({
      res,
      message: 'Update status success',
    });
  }

  //delete
  async delete(req, res) {
    const cart = await AppDataSource.getRepository(Cart).findOne({
      where: {
        id: req.query.cartId,
        deleteAt: IsNull(),
      },
    });

    const cartDescription = await AppDataSource.getRepository(
      CartDescription
    ).find({
      relations: ['cart', 'product'],
      where: {
        cart: {
          id: req.query.cartId,
          deleteAt: IsNull(),
        },
      },
    });

    if (!cart)
      return error({
        res,
        message: 'Cart not found',
      });

    const listProduct = cartDescription?.map((value) => {
      return {
        productId: value.product.id,
        buyQuantity: value.quantity,
      };
    });

    const productRepo = await AppDataSource.getRepository(Product);
    listProduct?.map(async (value) => {
      await productRepo.update(value?.productId, {
        quantity: () => `quantity + ${value?.buyQuantity}`,
      });
    });

    await AppDataSource.getRepository(Account).update(
      {
        user: {
          id: req.query.idUser,
        },
      },
      {
        purchaseCount: () => 'purchaseCount - 1',
      }
    );

    await AppDataSource.getRepository(Cart).remove(cart);

    return success({
      res,
      message: 'Delete cart success',
    });
  }

  async deleteSoft(req, res) {
		const data = req.body;
    const cart = await AppDataSource.getRepository(Cart).findOne({
      where: {
        id: req.params.id,
        deleteAt: IsNull(),
      },
    });

		const employee = await AppDataSource.getRepository(User).findOne({
			where: {
				id: data?.employeeId
			}
		});

    if (!cart)
      return error({
        res,
        message: 'Cart not found',
    });

		cart.approvalEmployee = employee;

    await AppDataSource.getRepository(Cart).save({
      ...cart,
      deleteAt: moment().format(),
    });

    return success({
      res,
      message: 'Delete soft cart success',
    });
  }
}

export default new CartService();
