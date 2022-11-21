import { AppDataSource } from '../data-source';
import { Product } from '../entity';
import { error, isEmptyObject, success } from '../util';

class ProductService {
  // get all
  async getAll(_, res) {
    const result = await AppDataSource.getRepository(Product).find();
    return res.send(result);
  }

  //get product by manufacturer
  async getProductsByManufacturer(req, res) {}

  //get product by product type
  async getProductsByProductType(req, res) {}

  //get product by accessory type
  async getProductsByAccessoryType(req, res) {}

  //get product by service type
  async getProductsByServiceType(req, res) {}

  //get product by product id
  async getProductById(req, res) {}

  //create
  async create(req, res) {
    if (isEmptyObject(req.body)) {
      return error({
        res,
        message: 'Please fill data',
      });
    } else {
      const { name, image, quantity, price } = req.body;
			const productRepo = await AppDataSource.getRepository(Product);
			const result = await productRepo.save(
				await productRepo.create({
					...req.body,
				})
			)
			return success({
				res,
				message: result
			})
    }
  }

  //update
  async update(req, res) {}

  //delete
  async delete(req, res) {}
}

export default new ProductService();
