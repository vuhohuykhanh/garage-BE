import moment = require('moment');
import { IsNull } from 'typeorm';
import { AppDataSource } from '../data-source';
import {
  Account,
  Cart,
  CartDescription,
  Product,
  Status,
  User,
} from '../entity';
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

    const { product: listProducts, customer, ...dataCart } = req.body;

    const cart = await AppDataSource.getRepository(Cart).save({
      ...dataCart,
      customer: customer,
      status: 1,
    });

    await AppDataSource.createQueryBuilder()
      .insert()
      .into(CartDescription)
      .values(
        listProducts?.map((item) => ({
          cart,
          product: item,
          quantity: item.quantity,
          price: item.price,
          usageTime: item.usageTime || new Date(),
          type: 'Mua bán',
        }))
      )
      .execute();

    const productRepo = await AppDataSource.getRepository(Product);

    listProducts?.map(async (value) => {
      await productRepo.update(value?.id, {
        quantity: () => `quantity - ${value?.quantity}`,
      });
    });

    await AppDataSource.getRepository(Account).update(customer, {
      purchaseCount: () => 'purchaseCount + 1',
    });

    return success({
      res,
      message: 'Create success',
    });
  }

  //getCartDescriptionByCartId
  async getCartDescriptionByCartId(req, res) {
    const result = await AppDataSource.getRepository(CartDescription).find({
      relations: ['cart', 'product', 'product.saleDescriptions'],
      where: {
        cart: {
          id: req.query.cartId,
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
    const { idCartDes, productAdd, additionPrice } = req.body;
		let newDate;

		if(additionPrice) {
			const productFee = await AppDataSource.getRepository(Product).findOne({
				where: {
					id: 61
				}
			});
			// add additional price (add phi dich vu kham benh)
			await AppDataSource.createQueryBuilder()
      .insert()
      .into(CartDescription)
      .values(
        {
          cart: idCartDes,
          product: productFee,
          quantity: 1,
          price: additionPrice,
          type: 'Mua bán',
          usageTime: null,
        }
      )
      .execute();

			await AppDataSource.getRepository(Cart).update(idCartDes, {
				totalPrice: () => `totalPrice + ${Number(additionPrice)}`,
			})
		}

    await AppDataSource.createQueryBuilder()
      .insert()
      .into(CartDescription)
      .values(
        productAdd?.map((item) => {
					newDate = new Date();
					return {
          cart: idCartDes,
          product: item,
          quantity: item.quantity,
          price: item.price,
          type: item?.type || '',
          usageTime: item.usageTime || new Date(newDate.setMonth(newDate.getMonth()+6)),
        }})
      )
      .execute();

    const productRepo = await AppDataSource.getRepository(Product);

    productAdd?.map(async (value) => {
      await productRepo.update(value?.id, {
        quantity: () => `quantity - ${value?.quantity}`,
      });
    });

    return success({
      res,
      message: 'Add into cart success',
    });
  }

  //confirm cart description
  async confirmCartDescription(req, res) {
    const { id, newPrice } = req.body;

    const cartRepo = await AppDataSource.getRepository(Cart);

    await AppDataSource.createQueryBuilder()
      .update(CartDescription)
      .set({ type: 'Mua bán' })
      .where({
        cart: {
          id: id,
        },
      })
      .execute();

    await cartRepo.update({ id: id }, { totalPrice: newPrice });

    return success({
      res,
      message: 'Confirm cart description success',
    });
  }

  // delete product additional in cartDescription
  async deleteCartDescription(req, res) {
    const { id } = req.params;

    const cartDescriptionRepo = await AppDataSource.getRepository(
      CartDescription
    );

    const listCartDescription = await cartDescriptionRepo.find({
      relations: ['product'],
      where: {
        cart: {
          id: id,
        },
        type: 'Báo giá',
      },
    });

    // get list product from list product add
    const listProductAdd = listCartDescription?.map((value) => ({
      productId: value?.product?.id,
      buyQuantity: value?.quantity,
    }));

    // add lại số lượng product khi hủy
    const productRepo = await AppDataSource.getRepository(Product);
    listProductAdd?.map(async (value) => {
      await productRepo.update(value?.productId, {
        quantity: () => `quantity + ${value?.buyQuantity}`,
      });
    });

    // xóa những đơn trong description
    await cartDescriptionRepo.remove(listCartDescription);

    return success({
      res,
      message: 'Delete cart description success',
    });
  }

  //delete cart desc
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
