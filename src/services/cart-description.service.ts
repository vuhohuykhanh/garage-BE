import moment = require('moment');
import { IsNull } from 'typeorm';
import { AppDataSource } from '../data-source';
import { Cart, CartDescription, Product, Status, User } from '../entity';
import { error, isEmptyObject, success } from '../util';

class CartDescriptionService {
  //get-all
  async getAll(_, res) {
    const result = await AppDataSource.getRepository(CartDescription).find({
      relations: ['product', 'cart'],
    });
    return res.send(result);
  }

  //create
  async create(req, res) {
    if (isEmptyObject(req.body))
      return error({
        res,
        message: 'Please fill body data',
      });

    const { product: listProducts, ...dataCart } = req.body;

    const cart = await AppDataSource.getRepository(Cart).save({
      ...dataCart,
    });

    const cartDes = await AppDataSource.createQueryBuilder()
      .insert()
      .into(CartDescription)
      .values(
        listProducts.map((item) => ({
					cart,
					product: item,
					quantity: item.quantity,
					usageTime: item.usageTime || new Date(),
				})),
      )
      .execute();

    return success({
      res,
      message: 'Create success',
    });
  }

  //getCartDescriptionByCartId
  async getCartDescriptionByCartId(req, res) {
    const result = await AppDataSource.getRepository(CartDescription).find({
      relations: ['cart', 'product'],
      where: {
        cart: {
          id: req.params.cartId,
        },
      },
    });

    return success({
      res,
      message: result,
    });
  }

  //addCartDescription
  async addCartDescription(req, res) {
    res.send('Đang làm');
  }

  //confirm cart description
  async confirmCartDescription(req, res) {
    res.send('Đang làm');
  }

  //delete cart des
  async delete(req, res) {
    const cartDes = await AppDataSource.getRepository(CartDescription).findOne({
      where: {
        cartDesId: req.params.id,
        deleteAt: IsNull(),
      },
    });

    if (!cartDes)
      return error({
        res,
        message: 'Cart Description not found',
      });

    await AppDataSource.getRepository(CartDescription).save({
      ...cartDes,
      deleteAt: moment().format(),
    });

    return success({
      res,
      message: 'Delete cart success',
    });
  }
}

export default new CartDescriptionService();
